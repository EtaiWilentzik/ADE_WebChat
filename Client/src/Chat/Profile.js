import React, {useState, useRef} from 'react';
import './Contact';
import { token} from "../Home/Home";
import './Profile.css'
import { socket } from './chat';

export function Profile({ update, c_profile, setMyContacs}) {
    const inputRef = useRef(null);
    const [inputError, setInputError] = useState("");
    const handleLoadProfile = async () => {

        try {
            const username = inputRef.current.value;
            const newContact =  await add_contact(username, setInputError);
            if (newContact) {
                setMyContacs(prev=> [newContact, ...prev])
                socket.emit("joinChat", { chatId: newContact.id, username, user: c_profile})
            }
            // Additional processing or actions after successfully adding the contact
        } catch (error) {
            console.error("Failed to add contact:", error);
            // Handle the error gracefully
        }
    };

    const handleSaveChanges = async () => {
        try {
            // Make the API request or perform any other necessary operations
            // to add the new contact here
            await handleLoadProfile(); // Call handleLoadProfile after the API request is complete
            update();
            closeModal();
            console.log("added the new contact");
        } catch (error) {
            console.error("Failed to add contact:", error);
            // Handle the error gracefully
        }
    };

    const closeModal = () => {
        console.log("in close modal")
        setInputError("");
        inputRef.current.value = '';
    };

    return (
        <>
            <div className="card" id="CardsHeight">
                <div className="card-body">
                    <ul className="list-unstyled mb-0">
                        <li className="p-2">
                            <a href="#!" className="d-flex justify-content-start">
                                <div className="d-flex flex-row">
                                    <img
                                        src={c_profile.profilePic}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong photos col-5  col-md-6 col-lg-5 col-xl-4"
                                        id="me"
                                    />
                                    <div className="pt-1">
                                        <p className="fw-bold mb-0" id="etai">
                                            {c_profile.displayName}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    id="person1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <span className="bi bi-person-plus" />
                                </button>
                                <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex={-1}
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    Add contact
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={closeModal}
//                                                     this is the X button
                                                />
                                            </div>
                                            <div className="modal-body">
                                                <input
                                                    type="text"
                                                    ref={inputRef}
                                                    name="input-field "
                                                    placeholder="Enter your contact full name"
                                                    style={{ width: '100%', borderColor: inputError ? 'red' : null }}
                                                />
                                                {/*insert it to css*/}
                                                {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    data-bs-dismiss="modal"
                                                    onClick={handleSaveChanges}
                                                >
                                                    Save changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

async function add_contact(username, setInputError) {
    const data = {
        username: username,
    };

    try {
        const url = `http://localhost:5000/api/Chats/`;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            return await res.json();
            // Additional processing or actions with the result
        } else {
            console.log("the server returned " + res.status);
            setInputError("username not exist");
            alert("username not exist")
            return;
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
