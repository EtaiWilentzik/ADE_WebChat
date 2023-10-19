import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "./chat";
import { token } from "../Home/Home";
import { Message } from "./Message";

async function load_chat_fromServer(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/Chats/${id}`, {
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
            //  myProfile = new Contact(result.displayName, result.profilePic, "OP status");
            // Additional processing or actions with the result
        } else {
            console.log("Request failed:", res.status);
            // Additional error handling or actions
        }
    } catch (error) {
        console.log("Error:", error);
        // Additional error handling or actions
    }

}

async function sendMessage(id,content) {
    const data = {
        msg: content,
    };
    console.log("the id is"+id+"the cpntemt is"+content)

    const res = await fetch(`http://localhost:5000/api/Chats/${id}/Messages`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });
   console.log("the response from the server was");
    console.log(res);
    if (res.ok) {
        console.log("sent the message ok");
        return await res.json();
    } else {
        alert("get messages failed",);
    }
}

export  function Conversation({myProfile, index, setMyContacs}){
    const [myMessages,setMyMessages]= useState([]);
    const messagesRef= useRef(null);

    useEffect(()=> {
        const container = messagesRef.current;
        if (container && container.scrollHeight) {
            container.scrollTop = container.scrollHeight;
        }
    }, [myMessages, messagesRef])

    console.log("loading conversation, the id is"+index)
//this is the send message its like send message to the server
    const handleClick1 = async () => {
      const msg = document.getElementById('textAreaExample2').value;
      document.getElementById('textAreaExample2').value = "";
      console.log("the msg is " + msg);
      const message = await sendMessage(index, msg, handleLoadMessages);
      if (message) {
        console.log("message?", message)
          socket.emit("send_message",{message, chatId: index});
      }
    };

    const handleLoadMessages = useCallback(async () => {
        try {
            const result = await load_chat_fromServer(index);
            console.log("the index is "+ index);
            console.log("messages", result);
            if (result) {
                setMyMessages(result?.messages);
            }
        } catch (error) {
            console.error("Failed to load profile:", error);
            // Handle the error gracefully
        }
    }, [index]);

    useEffect(() => {
        console.log("i am in the useEffect")
        const handleMessage =  ({message, chatId})=> {
            console.log("NEW MSG", message)
            if (chatId === index) { // if the message is for this chat
                setMyMessages(oldMessages => ([...oldMessages, message]))
            }
            setMyContacs(oldContacts => {
                const newContacts = [...oldContacts];
                const chatIndex = newContacts.findIndex(chat => chat.id === chatId);
                newContacts[chatIndex].lastMessage = message;
                return newContacts;
            })
        }


        socket.on("receive_message", handleMessage)
        handleLoadMessages()
        return ()=> {
            socket.off("receive_message", handleMessage)
        }
    }, [index, setMyContacs, handleLoadMessages]);


    if (!myMessages) {
        return <div>Loading...</div>;
    }
    return(
        <div className="col-md-6 col-lg-7 col-xl-8">
            <ul className="card bg-transparent border-0 " id="RightCardHeight">
                <div className="card-body overflow-auto" style={{ height: '50vh'}} ref={messagesRef}>
                    {myMessages?.length > 0 && myMessages.map((msg, index) => {
                        return (
                            // msg?.sender?.profilePic
                            <Message
                                key={index}
                                name={msg?.sender?.displayName}
                                img={msg?.sender?.profilePic}
                                time={msg?.created}
                                message={msg?.content}
                                type={msg?.sender.username===myProfile.username ? 'right' : 'left'}
                            />
                        );
                    })}
                </div>


                <div className="col" id="sendmessage">
                    <div className="input-group">
                  <textarea
                      className="form-control form-control-lg"
                      id="textAreaExample2"
                      rows="2"
                      /*       check if adi did it */
                      defaultValue={""}
                  />
                        <button type="button" className="btn btn-success"  id="chat-send-button" onClick={handleClick1}>
                            <span className="bi bi-send" />
                        </button>
                    </div>
                </div>
            </ul>
        </div>)
}
