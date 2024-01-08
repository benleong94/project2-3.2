import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { database, auth, storage } from "./firebase";
import { signOut } from "firebase/auth";
import { onChildAdded, onChildChanged, ref } from "firebase/database";
import "./App.css";

//Components
import Navbar from "./Components/Navbar";
import InputProfile from "./Components/InputProfile";
import Roomie from "./Components/Roomie";
import Property from "./Components/Property";
import Chat from "./Components/Chat";
import LoginSignup from "./Components/LoginSignup";
import Settings from "./Components/Settings";
import RoomieDetails from "./Components/RoomieDetails";
import ProfilePage from "./Components/ProfilePage";
import ErrorPage from "./Components/ErrorPage";
import IndividualChat from "./Components/IndividualChat";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [roomieProfiles, setRoomieProfiles] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currConversations, setCurrConversations] = useState([]);

  //lifted email and password states up so that the Settings component can also get access to it.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const DB_PROFILES_KEY = "profiles";
  const DB_CONVO_KEY = "conversations";
  const DB_PROFILE_IMAGES_KEY = "profile_images";
  const profilesRef = ref(database, DB_PROFILES_KEY);
  const conversationsRef = ref(database, DB_CONVO_KEY);

  //Profiles are gotten from firebase here.
  useEffect(() => {
    onChildAdded(profilesRef, (data) => {
      setProfiles((prev) => [...prev, { key: data.key, val: data.val() }]);
    });
    //onChildAdded is currently being called when the user's ProfilePage is called,
    //causing a setProfiles() is not defined error to appear.

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
      (profile) => profile.key !== user.uid
    );
    setRoomieProfiles(profilesForDisplay);
  }, [isLoggedIn]);

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
      {/* {Object.keys(currentProfile).length !== 0 ? (
        <div className="greeting-user">
          {" "}
          Welcome, {currentProfile.val.name}!
        </div>
      ) : null} */}
      <Routes>
        <Route
          path="/"
          element={
            <LoginSignup
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
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
          element={<Chat currentProfile={currentProfile} profiles={profiles} />}
        />
        <Route
          path="/settings"
          element={
            <Settings
              isLoggedIn={isLoggedIn}
              handleSignOut={handleSignOut}
              user={user}
              setUser={setUser}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/create-profile"
          element={
            <InputProfile
              user={user}
              setIsLoggedIn={setIsLoggedIn}
              storage={storage}
              DB_PROFILE_IMAGES_KEY={DB_PROFILE_IMAGES_KEY}
              database={database}
            />
          }
        />

        <Route
          path="/profilepage"
          element={
            <ProfilePage
              user={user}
              auth={auth}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
              DB_PROFILES_KEY={DB_PROFILES_KEY}
              DB_PROFILE_IMAGES_KEY={DB_PROFILE_IMAGES_KEY}
              profilesRef={profilesRef}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/chatroom" element={<IndividualChat />} />
      </Routes>
    </div>
  );
}

export default App;
