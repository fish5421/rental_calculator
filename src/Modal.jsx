export default function TimeoutModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded-lg w-1/2 z-60"> {/* Increased z-index here */}
                <h1 className="text-2xl font-bold mb-4">Timeout</h1>
                <p>The request has timed out. Please try again.</p>
                <button
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
