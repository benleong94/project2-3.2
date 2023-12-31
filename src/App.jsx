import Navbar from './Components/Navbar';
import { Routes, Route, useNavigate } from "react-router-dom";
import Roomie from './Components/Roomie';
import Property from './Components/Property';
import Chat from './Components/Chat';
import LoginSignup from './Components/LoginSignup';
import "./App.css"
import Settings from './Components/Settings';
import { useState, useEffect } from 'react';
import InputProfile from './Components/InputProfile';
import { database, auth } from "./firebase";
import { signOut } from "firebase/auth";
import { onChildAdded, onChildChanged, ref} from "firebase/database";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const navigate = useNavigate();

    const DB_PROFILES_KEY = "profiles";
    const profilesRef = ref(database, DB_PROFILES_KEY);

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
  }, []);

  useEffect(() => {
    profiles.map((profile) => {
      profile.key === user.uid ? setCurrentProfile(profile) : null;
    });
  }, [isLoggedIn]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUser({});
      navigate("/")
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
          element={<Roomie user={user} profiles={profiles} currentProfile={currentProfile}/>}
        />
        <Route path="/find-property" element={<Property />} />
        <Route path="/chat" element={<Chat currentProfile={currentProfile} profiles={profiles}/>} />
        <Route path="/settings" element={<Settings isLoggedIn={isLoggedIn} handleSignOut={handleSignOut}/>} />
        <Route path="/create-profile" element={<InputProfile user={user} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </div>
  );
}

export default App
