import Navbar from "./Components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Roomie from "./Components/Roomie";
import Property from "./Components/Property";
import Chat from "./Components/Chat";
import LoginSignup from "./Components/LoginSignup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Settings from "./Components/Settings";
import { useState, useEffect } from "react";
import InputProfile from "./Components/InputProfile";
import { database, auth } from "./firebase";
import { signOut } from "firebase/auth";
import { onChildAdded, onChildChanged, ref } from "firebase/database";
import RoomieDetails from "./Components/RoomieDetails";
import ProfilePage from "./Components/ProfilePage";
import ErrorPage from "./Components/ErrorPage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [roomieProfiles, setRoomieProfiles] = useState([]);
  const [conversations, setConversations] = useState([]); 
  const [currConversations, setCurrConversations] = useState(null); 

  const navigate = useNavigate();

  const DB_PROFILES_KEY = "profiles";
  const DB_CONVO_KEY = "conversations";
  const profilesRef = ref(database, DB_PROFILES_KEY);
  const conversationsRef = ref(database, DB_CONVO_KEY);

  useEffect(() => {
    onChildAdded(profilesRef, (data) => {
      setProfiles((prev) => [...prev, { key: data.key, val: data.val() }]);
    });
    onChildChanged(profilesRef, (data) =>
      setProfiles((prev) =>
        prev.map((item) =>
          item.key === data.key ? { key: data.key, val: data.val() } : item
        )
      )
    );
    onChildAdded(conversationsRef, (data) => {
      setConversations((prev) => [...prev, { key: data.key, val: data.val() }]);
    });
    onChildChanged(conversationsRef, (data) =>
      setConversations((prev) =>
        prev.map((item) =>
          item.key === data.key ? { key: data.key, val: data.val() } : item
        )
      )
    );
  }, []);

  useEffect(() => {
    profiles.map((profile) => {
      profile.key === user.uid ? setCurrentProfile(profile) : null;
    });
  }, [user]);

  useEffect(() => {
    let profilesForDisplay = profiles.filter(
      (profile) => (profile.key !== user.uid) 
    );
    setRoomieProfiles(profilesForDisplay);
  }, [isLoggedIn]);

  useEffect(() => {
    const filteredConversations = conversations.filter(conversation => {
      const participants = conversation.key.split('-');
      return participants.includes(user.uid);
    });
    setCurrConversations(filteredConversations);
  }, [currentProfile, conversations]); 

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUser({});
      setCurrentProfile({});
      navigate("/");
    });
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <LoginSignup setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          }
        />
        <Route
          path="/find-roomie"
          element={
            <Roomie
              user={user}
              profiles={profiles}
              currentProfile={currentProfile}
              roomieProfiles={roomieProfiles}
            />
          }
        />
        <Route path="/roomie-details" element={<RoomieDetails />}></Route>
        <Route path="/find-property" element={<Property />} />
        <Route
          path="/chat"
          element={<Chat currentProfile={currentProfile} profiles={profiles} currConversations={currConversations}/>}
        />
        <Route
          path="/settings"
          element={
            <Settings
              isLoggedIn={isLoggedIn}
              handleSignOut={handleSignOut}
              user={user}
            />
          }
        />
        <Route
          path="/create-profile"
          element={<InputProfile user={user} setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/profilepage"
          element={
            <ProfilePage
              user={user}
              auth={auth}
              currentProfile={currentProfile}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}

export default App;
