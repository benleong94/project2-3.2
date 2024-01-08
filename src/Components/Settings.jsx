import { Link, redirect, useNavigate } from "react-router-dom";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function Settings({
  isLoggedIn,
  handleSignOut,
  user,
  setUser,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [user_credentials, setUserCredentials] = useState({});
  const navigate = useNavigate();

  const handleEmailInput = (e) => {
    //setEmail(e.target.value);
    setUser((prevUserValue) => ({
      ...prevUserValue,
      email: e.target.value,
    }));
  };

  const submitEmail = (e) => {
    e.preventDefault();

    const auth = getAuth();

    //user.email.type must be a string.
    console.log(typeof user.email);

    updateEmail(auth.currentUser, `${user.email}`)
      .then(() => {
        // Email updated!
        // ...
      })
      .catch((error) => {
        console.log("THIS IS THE ERROR:", error);
        if (error.code == "auth/requires-recent-login") {
          setOpenModal(true);
          //get the user to reauthenticate
        }
        // An error occurred
        // ...
      });
  };

  useEffect(() => {
    console.log("openModal: ", openModal);
  }, [openModal]);

  useEffect(() => {
    setEmail(user.email);
  }, []);

  useEffect(() => {
    console.log("email state updated to: ", user.email);
  }, [user]);

  return (
    <>
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        setUserCredentials={setUserCredentials}
      >
        <p>Please sign in again to update email and password.</p>
        <img src="../public/x.png" />
      </Modal>
      <div className="settings-container">
        <div>
          <form>
            <h1>Email:</h1>
            <input type="text" value={user.email} onChange={handleEmailInput} />

            <button onClick={submitEmail}>Submit</button>
          </form>
        </div>

        <div>
          <h1>Old Password</h1>
          <input type="password" value={""} />
        </div>

        <div>
          <h1>New Password</h1>
          <input type="password" value={""} />
        </div>

        <Link to={"/profilepage"}>Your Profile</Link>

        <Link onClick={handleSignOut}>Sign Out</Link>
      </div>
    </>
  );
}

export default Settings;

//const user = auth.currentUser;
// Try to update email. if an error is thrown, and the error is because the log in is too old,
//prompt the user to log in again.
//console.log("auth.currentUser: ", auth.currentUser);

// reauthenticateWithCredential(user, credential)
//   .then(() => {
//     // User re-authenticated.
//     //Update the user's email, now that they've been re-authenticated.
//   })
//   .catch((error) => {
//     // An error ocurred
//     // ...
//   });

// //const promptForCredentials = () => {
//   alert("Please sign in again to edit email or password.");

//   sign_in_again();
//   //replace with a modal to make it look nice?
// };
