import { useEffect, useState } from "react";
import IndividualChat from "./IndividualChat";
import { Link, Routes, Route } from "react-router-dom";

function Chat({ currentProfile, profiles, currConversations }) {
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [chatPerson, setChatPerson] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const handleChatClick = (chatKey, userName) => {
    let currConvoArray = currConversations.find(
      (conversation) => conversation.key === chatKey
    );
    setCurrentChat(currConvoArray);
    setChatPerson(userName);
  };

  useEffect(() => {
    let names = [];
    currentProfile.val.peopleMatched.forEach((matchedKeys) => {
      profiles.forEach((profile) => {
        if (profile.key === matchedKeys) {
          let userProfile = { [profile.val.name]: profile.key };
          names.push(userProfile);
        }
      });
    });
    setMatchedProfiles(names);
  }, [profiles]);

  return (
    <>
      <div className="matched-container">
        <h1 className="text-4xl">Matched Friends: </h1>
        {matchedProfiles.map((userProfile, index) => {
          const userName = Object.keys(userProfile)[0];
          const userKey = userProfile[userName];
          const chatKey = [currentProfile.key, userKey].sort().join("-");
          return (
            <div
              key={index}
              onClick={() => handleChatClick(chatKey, userName)}
              className="cursor-pointer my-2"
            >
              {userName}
            </div>
          );
        })}
      </div>
      {currentChat ? (
        <IndividualChat chat={currentChat} chatPerson={chatPerson} currentProfile={currentProfile} />
      ) : null}
    </>
  );
}

export default Chat;
