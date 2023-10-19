import {useState} from "react";
import {users} from "../index.js";
export function ValidateUserName(username, setUsernameError) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  if (!usernameRegex.test(username)) {
    setUsernameError("Not a valid username");
  }
//    else if (users.some((user) => user.username === username)) {
//     setUsernameError("Username already exists");
   else {
    setUsernameError("");
  }
}


export function RegisterUsername({ username, setUsername, usernameError, setUsernameError }) {

    return (


        <div className="d-flex flex-row align-items-center mb-4">
          <div className="form-outline flex-fill mb-0">
            <input
              type="text"
              className={`form-control ${usernameError ? 'is-invalid' : ''}`}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => ValidateUserName(username, setUsernameError)}
              title="3-20 chars, only english letters and digits"
            />
            {usernameError && (
              <div className="invalid-feedback">
             {usernameError}
              </div>
            )}
          </div>
        </div>
    );
}

