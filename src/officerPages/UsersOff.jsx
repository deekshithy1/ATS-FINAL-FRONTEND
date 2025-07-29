// components/UsersOff.jsx
import React, { useEffect, useState } from 'react';
import { useAtsStore } from '../store/useAtsStore';
import { useUserStore } from '../store/useUserStore';

const UsersOff = () => {
  const [atsId, setAtsId] = useState('');
  const [view, setView] = useState('list');
 const [formOpen,setFormOpen]=useState("closed");
  const atsCentersFn = useAtsStore.getState().atsvehiclesfn; // stable ref
  const ats = useAtsStore((s) => s.ats);

  const getAllUsers = useUserStore.getState().getAllUsers;
  const users = useUserStore((s) => s.users);

  useEffect(() => {
    atsCentersFn(); // Load ATS centers once
  }, []);

  const handleClick = async (e, id) => {
    e.preventDefault();
    setAtsId(id);
    await getAllUsers(id);
    setView('details');
  };
console.log(users)

  return (
    <div className="p-4">
      <div className="text-xl font-semibold mb-4">ATS Users</div>

      {/* ATS Centers List */}
      {view === 'list' && (
        <div className="flex flex-wrap gap-4">
          {ats?.map((center) => (
            <div
              key={center._id}
              className="bg-white shadow p-4 rounded-lg w-64 flex flex-col items-center"
            >
              <div className="text-center mb-2">
                <h3 className="font-bold text-lg">{center.name}</h3>
                <h4 className="text-sm text-gray-500">{center.code}</h4>
              </div>
              <button
                className="bg-blue-700 text-white rounded-2xl px-4 py-2"
                onClick={(e) => handleClick(e, center._id)}
              >
                Monitor
              </button>
            </div>
          ))}
        </div>
      )}

      {/* User Details View */}
      {view === 'details' && (
        <div className="bg-white shadow p-4 rounded-lg">
          <div className='flex justify-between'> 
          <button
            onClick={() => setView('list')}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-300"
          >
            Back to ATS List
          </button>
          <button>
    
          </button>
          </div>
          <div className="text-lg font-semibold mb-2">Users in Selected ATS</div>
          <div className="space-y-2">
            {users?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user._id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          user.role === 'TECHNICIAN'
                            ? 'text-blue-600 bg-blue-100'
                            : 'text-green-600 bg-green-100'
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No users found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersOff;
