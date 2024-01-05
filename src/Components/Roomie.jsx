import { useState, useEffect } from "react";
import { database } from "../firebase";
import { set, ref, update } from "firebase/database";
import { Link } from "react-router-dom";
import UserProfile from './UserProfile';
import RoomieDetails from './RoomieDetails';

function Roomie({user, profiles, currentProfile, roomieProfiles}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createConvo, setCreateConvo] = useState(false);

  const DB_PROFILES_KEY = "profiles";
  const DB_CONVO_KEY = "conversations";
  const profilesRef = ref(database, DB_PROFILES_KEY);
  const conversationsRef = ref(database, DB_CONVO_KEY)

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setCurrentIndex(
        currentIndex < roomieProfiles.length - 1 ? currentIndex + 1 : 0
      );
    } else {
      setCurrentIndex(
        currentIndex > 0 ? currentIndex - 1 : roomieProfiles.length - 1 
      );
    }
  };

  const handleLike = () => {
    let displayedProfile = roomieProfiles[currentIndex]
    let userProfile = profiles.find((profile) => profile.key == user.uid)
    userProfile.val.peopleLiked.push(displayedProfile.key)

    const updates = {};
    updates[userProfile.key] = {
      name: userProfile.val.name,
      age: userProfile.val.age,
      occupation: userProfile.val.occupation,
      hobbies: userProfile.val.hobbies,
      smokingPreference: userProfile.val.smokingPreference,
      petFriendly: userProfile.val.petFriendly,
      peopleLiked: userProfile.val.peopleLiked,
      peopleMatched: userProfile.val.peopleMatched,
      url: userProfile.val.url
    };
    update(profilesRef, updates);
    //Show Liked Button (Modal)
  }

  //Check matching profiles - can change to App.jsx? 
  useEffect(() => {
    if (Object.keys(currentProfile).length !== 0) {
    let myProfileLikes = Object.values(currentProfile.val.peopleLiked); 
    
    profiles.map((profile) => {
      let likedUsersKeys = [];
      if (Object.keys(user).length !== 0) {
        profile.key !== user.uid
          ? (likedUsersKeys = Object.values(profile.val.peopleLiked))
          : null;
      }

      likedUsersKeys.map((likedKey) => {
        if (myProfileLikes.includes(profile.key) && likedKey == user.uid) {
          console.log("Match Found!");
          console.log(profile.val.name)
          console.log("Because " + profile.val.name + " liked: " + likedKey)
          console.log("And you are: " + user.uid)
          
          if (!currentProfile.val.peopleMatched.includes(profile.key)) {
            currentProfile.val.peopleMatched.push(profile.key);
            const updates = {};
            updates[currentProfile.key] = {
              name: currentProfile.val.name,
              age: currentProfile.val.age,
              occupation: currentProfile.val.occupation,
              hobbies: currentProfile.val.hobbies,
              smokingPreference: currentProfile.val.smokingPreference,
              petFriendly: currentProfile.val.petFriendly,
              peopleLiked: currentProfile.val.peopleLiked,
              peopleMatched: currentProfile.val.peopleMatched,
              url: currentProfile.val.url
            };
            update(profilesRef, updates);
            createConversation(currentProfile.key, profile.key)
          }
        }
      })
    }); 
    } 
  }, [profiles])

  const createConversation = (key1, key2) => {
    const conversationId = [key1, key2].sort().join("-");
    set(ref(database, "conversations/" + conversationId), 
    {"messageId0": 
      {
        "sender": "No Name",
        "text": "text",
        "timestamp": new Date()
      }
    })
    .then(() => {
      console.log("Conversation ID: " + conversationId);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }

  return (
    <div>
      {roomieProfiles.length > 0 ? (
        <div className='roomie-wrapper'>
          <div className="profile-wrapper">
            <Link to="/roomie-details">
              <UserProfile profile={roomieProfiles[currentIndex]} />
            </Link>
            <div className='pw-buttons'>
              <button onClick={() => handleSwipe("left")}>Left</button>
              <button onClick={() => handleSwipe("right")}>Right</button>              
            </div>
          </div>
          <button onClick={handleLike}>Like!</button>
        </div>
      ) : null}
    </div>
  );
}

export default Roomie