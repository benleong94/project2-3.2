import {
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Modal({ openModal, onClose, children, setUserCredentials }) {
  const sign_in_again = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);

        //onChange={(e) => setPassword(e.target.value)
        //Try to figure out a way to pass the credentials from here to the Settings Page
        //if the history of the person coming here is the Setting Page,
        //then return to the previous page (aka the Setting Page.)
        //Else, navigate to "/find-roomie".
      })
      .catch((err) => {
        console.log(err);
        navigate("*");
      });
  };

  return (
    //backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        openModal ? "visible bg-black/20" : "invisible"
      }`}
    >
      {children}
    </div>
  );
}

export default Modal;
