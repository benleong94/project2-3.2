import React from 'react'
import { useState } from 'react';

function IndividualChat() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = () => {
      setMessages([...messages, currentMessage]);
      setCurrentMessage("");
    };

    return (
      <div className="flex flex-col max-w-md mx-auto my-5 shadow-lg h-96">
        <div
          className="flex-grow overflow-auto p-4 space-y-4 bg-gray-100"
          style={{ maxHeight: "400px" }}
        >
          {messages.map((msg, index) => (
            <p key={index} className="break-words p-2 bg-white rounded shadow">
              {msg}
            </p>
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
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    );
}

export default IndividualChat