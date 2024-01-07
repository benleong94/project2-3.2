import React, { useEffect } from 'react'
import { useState } from 'react';
import { database } from "../firebase";
import { ref, set, onChildAdded, onChildChanged } from "firebase/database"; 

function IndividualChat({chat, chatPerson, currentProfile}) {
    const [messages, setMessages] = useState([]);
    const [displayedMessages, setDisplayedMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const DB_CONVO_KEY = "conversations";
    const conversationsRef = ref(database, DB_CONVO_KEY + "/" + chat.key);

    useEffect(() => {
      onChildAdded(conversationsRef, (data) => {
        setMessages((prev) => [...prev, { key: data.key, val: data.val() }]);
      });
    }, []);

    const sendMessage = () => {
      console.log(messages)
      const lastMessageID = messages[messages.length-1].key
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
      if (messages.length > 0) {
        let messageArray = Object.entries(messages);
        console.log(messageArray);
        setDisplayedMessages(messageArray);
      }
    },[messages])

    return (
      <div className="flex flex-col max-w-md mx-auto my-5 shadow-lg h-96">
        <div>Chatting With: {chatPerson}</div>
        <div
          className="flex-grow overflow-auto p-4 space-y-4 bg-gray-100"
          style={{ maxHeight: "400px" }}
        >
          {displayedMessages.map((msg, index) => (
            <div key={index}>
              <p>{msg[1].val.sender}</p>
              <p className="break-words p-2 bg-white rounded shadow">
                {msg[1].val.text}
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