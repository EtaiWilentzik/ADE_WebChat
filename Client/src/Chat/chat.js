import { Profile } from "./Profile";
import { Conversation } from "./Conversation";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Contact";
import "./chat.css";
import { token, activeUser, setToken, setActiveUser } from '../Home/Home.js';
import io from "socket.io-client";
import { GetContacts } from "./GetContacts";

const socket = io.connect("http://localhost:5000/", { transports: ["websocket"]});
export { socket };

export function Logout() {

    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleLogout = () => {
        setToken("")
        setActiveUser("")
        setIsButtonClicked(true);
    };

    if (isButtonClicked) {
        setToken("")
        setActiveUser("")
    }

    return (
        <div>
            <Link to="/" className="logout-button" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right logout-button" />
            </Link>
        </div>
    );
}

export function Chat() {
    const [count, setCount] = useState(0);
    const [myProfile, setMyProfile] = useState(null);
    const [myContacts,setMyContacs]=useState(null);

    const navigate = useNavigate();

    const checkSignedUser = () => {

        console.log("the ative user is "+activeUser);
        console.log("the token is +"+token);
        if(activeUser === "" || token === "") {
            console.log("frim checksigned user - moving to login")
            navigate("/")
        }
    }
    useEffect(() => {
        checkSignedUser();
        handleLoadProfile();

    }, []);

    const handleLoadContacts = async () => {
        try {
            const result = await load_chats(activeUser, token);
            result.forEach((chat)=> {
                socket.emit("joinChat", {chatId: chat.id})
            })

            setMyContacs(result);
        } catch (error) {
            console.error("Failed to load profile:", error);
            // Handle the error gracefully
        }
    };


    const handleLoadProfile = async () => {
        try {
            const profile = await load_profile();
            setMyProfile(profile);
        } catch (error) {
            console.error("Failed to load profile:", error);
            // Handle the error gracefully
        }
    };

    useEffect(() => {
        const handleNewChat = (chat)=> {
            socket.emit("joinChat", {chatId: chat.id})
            setMyContacs((prev)=> [chat,...prev]);
        }
        if (myProfile?.username) {
            socket.emit("joinMyRoom", myProfile.username);
            socket.on("newChat", handleNewChat)

            socket.on("chatDeleted", (chatId)=> {
                setMyContacs((prev)=> prev.filter(chat => chat.id !== chatId))
            })
        }
        return ()=>{
            // socket.off("leaveRoom", myProfile.username)
            socket.off("newChat", handleNewChat);
            // socket.off("chatDeleted")
        }
    }, [myProfile]);

    useEffect(()=> {
        console.log("this will happend when page go up")

        return ()=> {
            console.log("this will happend when page go down")
        }
    }, [])

    useEffect(() => {
        handleLoadContacts();
    }, []);

    if (!myProfile) {
        return <div>Loading...</div>;
    }
    if (!myContacts) {
        return <div>Loading...</div>;
    }
    const updateCount = (index) => {
        console.log("updating thr index to"+ index);
        setCount(index);
    };

    const UpdateCHat = (id) => {
        handleLoadContacts();
        console.log("the count is"+count+"the id is"+id)
        if(id===count){
            setCount(0);
        }
        console.log("updating the  chat")
    };
    const desiredCHat = myContacts.find(contact => contact.id === count);
    console.log("the desired chat is"+desiredCHat);
    console.log(desiredCHat);

    return (
        <section>
            <div className="container down">
                <Logout />
                <div className="row" id="CenterData">
                    <div className="col-md-6 col-lg-5 col-xl-4 ">
                        <Profile c_profile={myProfile} update={UpdateCHat} setMyContacs={setMyContacs} />
                        <GetContacts contactsArr={myContacts} updateCount={updateCount} bold_index={count} updateChat={UpdateCHat}/>
                    </div>
                    <Conversation  myProfile={myProfile} index={count} setMyContacs={setMyContacs} />
                </div>
            </div>
        </section>
    );
}

async function load_profile() {
    try {
        const res = await fetch(`http://localhost:5000/api/Users/${activeUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                /*'authorization': 'bearer ' + token //*/
            },
        });


        if (res.ok) {
            const result = await res.json();
            return result;
            // Additional processing or actions with the result
        } else {
            console.log("Request failed:", res.status);
            // Additional error handling or actions
        }
    } catch (error) {
        console.log("Error:", error);
        // Additional error handling or actions
    }
    /*  console.log("the profile is", JSON.stringify(myProfile));*/
}

async function load_chats(username, token) {

    const res = await fetch(`http://localhost:5000/api/Chats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            /*'authorization': 'bearer ' + token //*/
        },
    });

    if (res.ok) {
        const result = await res.json();
        return result;
        // Additional processing or actions with the result
    } else {
        console.log("Request failed:", res.status);
        // Additional error handling or actions
    }
}












