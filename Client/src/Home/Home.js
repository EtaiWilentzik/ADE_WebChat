import React from 'react';
import { Block } from './Block.js';
import { Chat } from '../Chat/chat.js';
import "./Home.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export let token="";
export let activeUser="";

export const setToken = (value) => {
  token = value;
};

export const setActiveUser = (value) => {
  activeUser = value;
};

export const Home = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Block args="login" />} />
          <Route path="/" element={<Block args="login" />} />
          <Route path="/register" element={<Block args="register" />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <img src="./logo.png" id="logo" className="col-1" alt="logo" />
      </BrowserRouter>
    </>
  );
};
