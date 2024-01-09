import { auth } from "../firebase";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthModal({
  openAuthModal,
  onClose,
  setEmail,
  email,
  password,
  setPassword,
  setVerified,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    console.log("authCredential:", auth.AuthCredential);
  }, []);

  const handleGetAuthCredential = (e) => {
    e.preventDefault();
    //Get the auth credential
    let authcredential = EmailAuthProvider.credential(email, password);

    //Take the auth credential and use it to reauthenticate.
    reauthenticateWithCredential(auth.currentUser, authcredential)
      .then(() => {
        setVerified(true);
        //User re-authenticated.
        //Close modal.
        //Now, updateEmail should just. work??
      })
      .catch((error) => {
        console.log(error);
        navigate("*");
        //An error occured.
      });

    console.log("authcredential:", authcredential);
  };

  useEffect(() => {
    console.log("password: ", password);
  }, [password]);

  useEffect(() => {
    console.log("email: ", email);
  }, [email]);

  return (
    //Backdrop
    <div
      onClick={onClose}
      className={` fixed inset-0 flex justify-center items-center transition-colors ${
        openAuthModal ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* The actual modal:
       */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`block h-fit w-fit bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {/*X button for closing Modal*/}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-grey-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <img src="../../public/x.png" />
        </button>
        <form onSubmit={handleGetAuthCredential}>
          {/*Input fields for login*/}
          <h1>Email</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1>Password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/*Button for login*/}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
