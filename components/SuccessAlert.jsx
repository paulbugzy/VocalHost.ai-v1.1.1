export default function SuccessAlert({ message, onClose }) {
      if (!message) return null;

      return (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 text-green-700 hover:text-green-900">
            &times;
          </button>
        </div>
      );
    }
