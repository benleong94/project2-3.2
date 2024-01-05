import React, { useEffect } from 'react'
import { useState } from 'react';
import { database } from "../firebase";
import { ref, set, onChildAdded, onChildChanged } from "firebase/database"; 

function IndividualChat({chat, chatPerson, currentProfile}) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = () => {
      const lastMessageID = messages[messages.length-1][0]
      const messageWord = lastMessageID.slice(0,-1)
      const newLastChar = Number(lastMessageID.charAt(lastMessageID.length - 1)) + 1;
      const newMessageID = messageWord + newLastChar
      set(ref(database, "conversations/" + chat.key + "/" + newMessageID), {
        sender: currentProfile.val.name,
        text: currentMessage
      })
        .then(() => {
          console.log("Message Sent!");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    };

    useEffect(() => {
      let messageArray = Object.entries(chat.val);
      console.log(messageArray)
      setMessages(messageArray)
    },[chat])

    return (
      <div className="flex flex-col max-w-md mx-auto my-5 shadow-lg h-96">
        <div>
          Chatting With: {chatPerson} {chat.key}
        </div>
        <div
          className="flex-grow overflow-auto p-4 space-y-4 bg-gray-100"
          style={{ maxHeight: "400px" }}
        >
          {messages.map((msg, index) => (
            <div key={index}>
              <p>{msg[1].sender}</p>
              <p className="break-words p-2 bg-white rounded shadow">
                {msg[1].text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex-none p-4 bg-slate-200">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="w-full p-2 border rounded mr-2"
          />
          <button
            onClick={sendMessage}
            className="p-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    );
}

export default IndividualChat