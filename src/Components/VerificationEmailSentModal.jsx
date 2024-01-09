import { useNavigate } from "react-router-dom";

function VerificationEmailSentModal({
  openVerificationEmailSentModal,
  onClose,
}) {
  const navigate = useNavigate();

  return (
    //Backdrop
    <div
      onClick={onClose}
      className={` fixed inset-0 flex justify-center items-center transition-colors ${
        openVerificationEmailSentModal ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* The actual modal:
       */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`block h-fit w-fit bg-white rounded-xl shadow p-6 transition-all ${
          openVerificationEmailSentModal
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
        {/*X button for closing Modal*/}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-grey-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <img src="../../public/x.png" />
        </button>
        <p>Verification email sent to new email!</p>
      </div>
    </div>
  );
}

export default VerificationEmailSentModal;
