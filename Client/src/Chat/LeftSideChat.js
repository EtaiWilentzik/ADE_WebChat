import React, {useState, useEffect} from 'react';
import './Contact';
import { Contact } from './Contact';
import {activeUser, token} from "../Home/Home";
import { GetContacts } from "./GetContacts";
import { Profile } from "./Profile";


export function LeftSide(args){
    const [myProfile, setMyProfile] = useState(null);
    const [myContacts,setMyContacs]=useState(null);

    useEffect(() => {
        handleLoadProfile();
    }, []);


    const handleLoadContacts = async () => {
        try {
            const result = await load_chats(activeUser, token);
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
        handleLoadContacts();
    }, []);


  if (!myProfile || !myContacts) {
    return <div>Loading...</div>;
  }
  
  const UpdateCHat = () => {

    handleLoadContacts();
    // setCount(count+1);
    console.log("updating the  chat")
  };
  return (
      <>
        <Profile c_profile={myProfile} update={UpdateCHat} contacts={args.contacts} />
        <GetContacts contactsArr={myContacts} bold_index={args.bold_index} />
      </>
    );
}
async function load_profile() {

  let myProfile;
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

      myProfile = new Contact(result.displayName, result.profilePic, "OP status");
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
  return myProfile;
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
