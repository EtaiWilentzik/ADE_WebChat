import { token } from "../Home/Home";
import { socket } from "./chat";

export function RepContact({ contact, updateCount,color ,updateChat}) {
    const handleClick = (id) => {
        updateCount(contact.id);
    };
    console.log(contact.id);
    let time;
    if(contact.lastMessage==null){
        time="send your first message";
    }else {
        time=contact.lastMessage.created;
        console.log("the time is"+ time);
        const date = new Date(time);
        const options = {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        time = date.toLocaleString("en-US", options);
    }
       let lastMessage="";
       if(contact.lastMessage!=null){
           lastMessage=contact.lastMessage.content;
       }
    return (
        <li className="p-2 border-bottom" style={{ backgroundColor: color }}>
            <a href="#!" className="d-flex justify-content-between" onClick={() => handleClick(contact.id)}>
                <div className="d-flex flex-row">
                    <img
                        src={contact.user.profilePic}
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong photos col-3"
                    />
                    <div className="pt-1">
                        <p className="fw-bold mb-0">{contact.user.displayName}</p>
                        <p className="fw-lighter" id="lastMessage">{lastMessage}</p>
                    </div>
                </div>
                <div className="pt-1">
                    <i className="bi bi-x-square exit" onClick={(event) => handleButtonClick(contact.id, event,updateChat)}></i>
                    <p className="small text-muted mb-1 ">{time}</p>
                </div>
            </a>
        </li>
    );
}


async function handleButtonClick(id, event,updateChat) {
    event.stopPropagation();
    const data = {
        id: id,
    };

    try {
        const url = `http://localhost:5000/api/Chats/${id}`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            console.log("The user that is deleted is " + JSON.stringify(data));
            socket.emit("chatDeleted", id)
            updateChat(id);
            return;
            // Additional processing or actions with the result
        } else if (res.status === 400) {
            return;
        } else {
            alert("There is no such username in the app");
        }
    } catch (error) {
        console.log("Error:", error);
    }

    console.log("Hi from closing");
}


