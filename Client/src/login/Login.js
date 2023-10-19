import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../index.js";
import { currentUser } from "../index.js";
import { useEffect } from 'react';
import { token, activeUser, setToken, setActiveUser } from '../Home/Home.js';

export function Login() {
  const navigate = useNavigate("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }
    login(username, password, setUsername, setPassword, navigate);
  };

  return (
    <>
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in</p>
        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
                value={username}
                title="Enter valid username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
                value={password}
                title="Enter valid password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-check d-flex justify-content-center mb-5" id="account">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg" id="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

async function login(username, password, setUsername, setPassword, navigate) {
  const data = {
    username: username,
    password: password
  };
  setActiveUser(username)

/*  console.log("the active user from login is !!!!!!!"+activeUser);*/

  const res = await fetch('http://localhost:5000/api/Tokens', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
   /* console.log("login ok");*/
    setUsername("");
    setPassword("");
    const json = await res.text();
    setToken(json)
    navigate("/chat");
  } else if (res.status === 404) {
    setUsername("");
    setPassword("");
    alert("Wrong username or/and password");
  } else {
    setUsername("");
    setPassword("");
    alert("An error occurred, please try again");
  }
}
