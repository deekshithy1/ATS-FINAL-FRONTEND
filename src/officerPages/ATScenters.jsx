
import React, { useEffect, useState } from 'react';
import { useAtsStore } from '../store/useAtsStore';
import { useVehiclestore } from '../store/useVehicleStoreOff';
import { Car } from 'lucide-react';




const ATScentres = () => {
  const atsFn = useAtsStore((s) => s.atsvehiclesfn);
  const ats = useAtsStore((s) => s.ats);
  const vehiclebyats = useVehiclestore((s) => s.getVehiclesById);
  const vehicles = useVehiclestore((s) => s.vehiclesByAts);
  const setvehicles = useVehiclestore((s) => s.setVehicles);
  const [view, setview] = useState('list');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    latitude: '',
    longitude: '',
  });
  const [message, setMessage] = useState('');


  useEffect(() => {
    atsFn();
  }, [atsFn]);

  const pendingVehicles = vehicles.filter((v) => v.status === 'PENDING');
  const INPROGRESSvehicles = vehicles.filter((v) => v.status === 'IN_PROGRESS');
  const CompletedVehicles = vehicles.filter((v) => v.status === 'COMPLETED');
  const APPROVEDVEHICLES = vehicles.filter((v) => v.status === 'APPROVED');

  const getCount = (data) => data.length;

  const vehiclecardDetails = [
    {
      title: 'Total Tests',
      value: getCount(vehicles),
      icon: Car,
      color: 'text-blue-600',
    },
    {
      title: 'Approved Tests',
      value: getCount(APPROVEDVEHICLES),
      icon: Car,
      color: 'text-green-600',
    },
    {
      title: 'Pending Tests',
      value: getCount(pendingVehicles),
      icon: Car,
      color: 'text-yellow-600',
    },
    {
      title: 'Tests Completed',
      value: getCount(CompletedVehicles),
      icon: Car,
      color: 'text-purple-600',
    },
    {
        title: 'In Progress ',
        value: getCount(INPROGRESSvehicles),
        icon: Car,
        color: 'text-purple-600',
      },
  ];

  const handleClick = (id) => {
    vehiclebyats(id);
    setview('details');
  };

  const handleBack = () => {
    setvehicles([]);
    setview('list');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createATS = async () => {
    try {
      const res = await API.post('/ats/createnew', formData); // Replace with actual endpoint
      setMessage('ATS center created successfully');
      setShowForm(false);
      setFormData({ name: '', code: '', latitude: '', longitude: '' });
      atsFn(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to create ATS center');
    }
  };

  return (
    <div className="p-6">
      {view === 'list' && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">ATS Centres</h2>

          <div className="flex justify-center mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {setShowForm((prev) => !prev)}}
            >
              {showForm ? 'Cancel' : 'Add ATS Center'}
            </button>
          </div>

          {showForm && (
  <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mb-6">
    <h3 className="text-lg font-semibold mb-4">New ATS Center</h3>

    {/* Name */}
    <div className="relative mb-4">
      <label
        htmlFor="name"
        className="absolute font-semibold text-[12px] text-[#082777] bg-white px-1 left-3 -top-2"
      >
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border border-gray-300 w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[16px] text-[#082777]"
      />
    </div>

    {/* Code */}
    <div className="relative mb-4">
      <label
        htmlFor="code"
        className="absolute font-semibold text-[12px] text-[#082777] bg-white px-1 left-3 -top-2"
      >
        Code
      </label>
      <input
        type="text"
        name="code"
        id="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Code"
        className="border border-gray-300 w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[16px] text-[#082777]"
      />
    </div>

    {/* Latitude */}
    <div className="relative mb-4">
      <label
        htmlFor="latitude"
        className="absolute font-semibold text-[12px] text-[#082777] bg-white px-1 left-3 -top-2"
      >
        Latitude
      </label>
      <input
        type="text"
        name="latitude"
        id="latitude"
        value={formData.latitude}
        onChange={handleChange}
        placeholder="Latitude"
        className="border border-gray-300 w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[16px] text-[#082777]"
      />
    </div>

    {/* Longitude */}
    <div className="relative mb-4">
      <label
        htmlFor="longitude"
        className="absolute font-semibold text-[12px] text-[#082777] bg-white px-1 left-3 -top-2"
      >
        Longitude
      </label>
      <input
        type="text"
        name="longitude"
        id="longitude"
        value={formData.longitude}
        onChange={handleChange}
        placeholder="Longitude"
        className="border border-gray-300 w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[16px] text-[#082777]"
      />
    </div>

    {/* Submit Button */}
    <button
      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      onClick={createATS}
    >
      Submit
    </button>

    {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
  </div>
)}


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ats?.map((centre) => (
              <div
                key={centre._id}
                className="bg-white shadow-md rounded-xl p-6 border-gray-200 hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-semibold text-center">{centre.name}</h3>
                <p className="text-gray-500 text-center mb-4">Code: {centre.code}</p>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  onClick={() => handleClick(centre._id)}
                >
                  Monitor
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'details' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Test Summary</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {vehiclecardDetails.map((v) => (
              <div
                key={v.title}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center space-y-2"
              >
                <v.icon className={`w-6 h-6 ${v.color}`} />
                <h3 className="text-md font-medium text-gray-600">{v.title}</h3>
                <span className="text-xl font-bold text-gray-800">{v.value}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleBack}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition"
            >
              ← Back to ATS Centres
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATScentres;
