import React from 'react';
import ReactDOM from 'react-dom/client';
import { createArray } from './Chat/chat';
import Register from "./registeration/Register";
import Chat from "./Chat/chat";
import { Home } from "./Home/Home";


export const users = [];
export const currentUser = [""]


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Home />
  // </React.StrictMode>
);

