import { Link, redirect, useNavigate } from "react-router-dom";
import { getAuth, verifyBeforeUpdateEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import VerificationEmailSentModal from "./VerificationEmailSentModal";

function Settings({
  handleSignOut,
  user,
  setUser,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [verified, setVerified] = useState(false);
  const [openVerificationEmailSentModal, setOpenVerificationEmailSentModal] =
    useState(false);

  const navigate = useNavigate();

  const handleEmailInput = (e) => {
    //setEmail(e.target.value);
    setUser((prevUserValue) => ({
      ...prevUserValue,
      email: e.target.value,
    }));
  };

  const handlePasswordInput = (e) => {
    setUser((prevUserValue) => ({
      ...prevUserValue,
      email: e.target.value,
    }));
  };

  const submitEmail = (e) => {
    e.preventDefault();

    //user.email.type must be a string.
    console.log(typeof user.email);
    const auth = getAuth();
    console.log("auth.currentUser: ", auth.currentUser);

    verifyBeforeUpdateEmail(auth.currentUser, user.email)
      .then(() => {
        setOpenVerificationEmailSentModal(true);
        console.log("verification email sent to new email. go check new email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitPassword = (e) => {};

  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  return (
    <div>
      <div className="settings-container">
        <div>
          {verified ? (
            <>
              <form onSubmit={submitPassword}>
                <h1>New Password</h1>
                <input
                  type="password"
                  value={user.password}
                  onChange={handlePasswordInput}
                />
                <button type="submit">Update Password!</button>
              </form>

              <form onSubmit={submitEmail}>
                <h1>New Email</h1>
                <input
                  type="text"
                  value={user.email}
                  onChange={handleEmailInput}
                />
                <button type="submit"> Update Email!</button>
              </form>
            </>
          ) : (
            <>
              <button
                className="text-white bg-amber-500 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 w-48"
                onClick={() => setOpenAuthModal(true)}
              >
                Account
              </button>
              {/*Popup to let user reauthenticate*/}
              <AuthModal
                openAuthModal={openAuthModal}
                onClose={() => setOpenAuthModal(false)}
                password={password}
                setPassword={setPassword}
                email={email}
                setEmail={setEmail}
                verified={verified}
                setVerified={setVerified}
              ></AuthModal>
            </>
          )}
        </div>
        <Link
          className="text-white bg-amber-500 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 w-48"
          to={"/profilepage"}
        >
          Profile
        </Link>
        <Link
          className="text-white bg-amber-500 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 w-48"
          onClick={handleSignOut}
        >
          Sign Out
        </Link>
        {openVerificationEmailSentModal && (
          <VerificationEmailSentModal
            openVerificationEmailSentModal={openVerificationEmailSentModal}
            onClose={() => setOpenVerificationEmailSentModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Settings;
