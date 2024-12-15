// src/UpdateModal.js
import React from 'react';

const UpdateModal = ({ isOpen, onClose, vehicle, onUpdate }) => {
  const [status, setStatus] = React.useState(vehicle ? vehicle.status : '');

  // Update the status when the vehicle prop changes
  React.useEffect(() => {
    if (vehicle) {
      setStatus(vehicle.status);
    }
  }, [vehicle]);

  const handleUpdate = () => {
    if (vehicle) {
      onUpdate(vehicle._id, { ...vehicle, status });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Update Vehicle Status</h2>
        <div className="mb-4">
          <input
            type="text"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded ">Cancel</button>
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;