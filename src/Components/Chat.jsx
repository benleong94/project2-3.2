import { useEffect, useState } from "react";

function Chat({currentProfile, profiles}) {
  const [matchedNames, setMatchedNames] = useState([])

  useEffect(() => {
    let names = [];
    currentProfile.val.peopleMatched.map((matchedKeys) => {
      console.log(matchedKeys)
      profiles.map((profile) => {
        if(profile.key === matchedKeys)  {
          names.push(profile.val.name)
        }
      })
    })
    setMatchedNames(names)
  }, [profiles])

  return (
    <div className="matched-container">
      <h1 className="text-4xl">Matched Friends: </h1>
      {matchedNames.map((name, index) => (
        <div className="text-xl mt-4" key={index}>
          {name}
        </div>
      ))}
    </div>
  );
}

export default Chat