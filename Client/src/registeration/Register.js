import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterName, ValidateFullName } from "./RegisterName.js";
import { RegisterPassword, ValidatePassword } from "./RegisterPassword.js";
import { RegisterRepeatPassword, ValidateRepeatPassword } from "./RegisterRepeatPassword.js";
import { RegisterUsername, ValidateUserName } from "./RegisterUserName.js";
import { users } from "../index.js";
import { Photo } from "./RegisterPhoto";
import { createArray } from "../Chat/chat.js";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      username === "" ||
      password === "" ||
      fullName === "" ||
      repeatPassword === "" ||
      photo === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    ValidateUserName(username, setUsernameError);
    ValidatePassword(password, setPasswordError);
    ValidateFullName(fullName, setFullNameError);
    ValidateRepeatPassword(password, repeatPassword, setRepeatPasswordError);

    if (
      usernameError ||
      passwordError ||
      fullNameError ||
      repeatPasswordError ||
      photoError
    ) {
      alert("Please fix the validation errors before submitting the form");
      return;
    }

    to_server(
      username,
      password,
      fullName,
      photo,
      setUsernameError,
      setPassword,
      setFullName,
      setUsername,
      setPasswordError,
      setFullNameError,
      setRepeatPassword,
      setRepeatPasswordError,
      setPhoto,
      setPhotoError,
      navigate
    );
  };

  return (
    <>
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 order-md-2">
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
        <form className="mx-1 mx-md-4">
          <RegisterUsername
            username={username}
            setUsername={setUsername}
            usernameError={usernameError}
            setUsernameError={setUsernameError}
          />

          <RegisterName
            fullName={fullName}
            setFullName={setFullName}
            fullNameError={fullNameError}
            setFullNameError={setFullNameError}
          />

          <RegisterPassword
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
          />

          <RegisterRepeatPassword
            password={password}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            repeatPasswordError={repeatPasswordError}
            setRepeatPasswordError={setRepeatPasswordError}
          />

          <Photo
            photo={photo}
            setPhoto={setPhoto}
            photoError={photoError}
            setPhotoError={setPhotoError}
          />

          <div className="form-check d-flex justify-content-center mb-5" id="account">
            <p>
              already have an account? <Link to="/login">log in here</Link>
            </p>
          </div>

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              id="submit"
              onClick={(event) => handleSubmit(event)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

async function to_server(
  username, password, fullName, photo, setUsernameError, setPassword, setFullName, setUsername, setPasswordError, setFullNameError, setRepeatPassword, setRepeatPasswordError, setPhoto, setPhotoError, navigate
) {
  const data = {
    username: username,
    password: password,
    displayName: fullName,
    profilePic: photo
  };

  const res = await fetch('http://localhost:5000/api/Users', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    console.log("registered ok");
    setUsername("");
    setPassword("");
    setFullName("");
    setUsernameError("");
    setPasswordError("");
    setFullNameError("");
    setRepeatPassword("");
    setRepeatPasswordError("");
    setPhoto("");
    setPhotoError("");
    navigate("/login");
  } else if (res.status === 409) {
    setUsername("");
    setUsernameError("username must be unique");
    alert("username already exists");
  } else {
    setUsername("");
    setPassword("");
    setFullName("");
    setUsernameError("");
    setPasswordError("");
    setFullNameError("");
    setRepeatPassword("");
    setRepeatPasswordError("");
    setPhoto("");
    setPhotoError("");
    alert("an error occured, fill it again");
  }
}
