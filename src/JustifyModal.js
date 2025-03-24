import { useState } from "react";

export default function JustifyModal({ selectedItems, onClose }) {
  const [justification, setJustification] = useState("");

  const handleSubmit = () => {
    console.log("Justified Stagiaires:", selectedItems);
    console.log("Justification:", justification);
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Justify Absence</h2>

        <p className="text-sm text-gray-600 mb-2">
          You have selected <strong>{selectedItems.length}</strong> stagiaires.
        </p>

        <textarea
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Enter your justification..."
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        ></textarea>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
