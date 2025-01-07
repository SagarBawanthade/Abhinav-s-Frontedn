import Modal from "react-modal";
import { Link } from "react-router-dom";

const LoginPrompt = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false} // Ensure accessibility
    >
      <div className="modal-content p-6">
        <h2 className="font-forumNormal text-2xl font-semibold text-center mb-4">Please Log In</h2>
        <p className="text-lg text-center mb-6">You need to log in to view and manage your cart.</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="btn btn-primary px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
          >
            Log In
          </Link>
          <button
            onClick={closeModal}
            className="btn btn-secondary px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginPrompt;
