import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database"; 
import { database } from "../firebase";

function LoginSignup({setIsLoggedIn, setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        const user = userCredential.user; 
        updateUserProfile(user.uid, {
          name: "",
          age: "",
          occupation: "",
          hobbies: "",
          smokingPreference: "",
          petFriendly: false,
          peopleLiked: [""],
          peopleMatched: [""]
        });
      })
      .catch((err) => {
        console.log(err);
      }); 
    navigate("/create-profile")
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoggedIn(true);
        setUser(userCredential.user);
      })
      .catch((err) => {
        console.log(err);
      });
    
      navigate("/find-roomie");
  };

  function updateUserProfile(uid, profileData) {
    set(ref(database, "profiles/" + uid), profileData)
      .then(() => {
        console.log(profileData)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  
  return (
    <div className="login-signup-container">
      <label>Email: </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <br />
      <label>Password: </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <div>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default LoginSignup