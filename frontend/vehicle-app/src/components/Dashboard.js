// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateModal from './UpdateModal';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ name: '', status: '' });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const response = await axios.get('http://localhost:5000/vehicles');
    setVehicles(response.data);
  };

  const addVehicle = async () => {
    const response = await axios.post('http://localhost:5000/vehicles', newVehicle);
    setVehicles([...vehicles, response.data]);
    setNewVehicle({ name: '', status: '' });
  };

  const updateVehicle = async (id, updatedData) => {
    const response = await axios.put(`http://localhost:5000/vehicles/${id}`, updatedData);
    setVehicles(vehicles.map(vehicle => (vehicle._id === id ? response.data : vehicle)));
  };

  const deleteVehicle = async (id) => {
    await axios.delete(`http://localhost:5000/vehicles/${id}`);
    setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
  };

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="container mx-auto p-4 mt-40">
      <h1 className="text-2xl font-bold mb-4">Vehicle Management Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Vehicle Name"
          value={newVehicle.name}
          onChange={e => setNewVehicle({ ...newVehicle, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Status"
          value={newVehicle.status}
          onChange={e => setNewVehicle({ ...newVehicle, status: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={addVehicle} className="bg-blue-500 text-white p-2">Add Vehicle</button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 border-b">Vehicle Name</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Last Updated</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{vehicle.name}</td>
              <td className="py-2 px-4 border-b">{vehicle.status}</td>
              <td className="py-2 px-4 border-b">{new Date(vehicle.lastUpdated).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => openModal(vehicle)} className="text-green-700   mr-10" >Update </button>
                <button onClick={() => deleteVehicle(vehicle._id)} className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      <UpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        vehicle={selectedVehicle}
        onUpdate={updateVehicle}
      />
    </div>
  );
};

export default Dashboard;