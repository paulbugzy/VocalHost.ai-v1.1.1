export default function ErrorAlert({ message, onClose }) {
      if (!message) return null;

      return (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 text-red-700 hover:text-red-900">
            &times;
          </button>
        </div>
      );
    }
