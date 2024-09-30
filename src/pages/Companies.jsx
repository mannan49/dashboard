import React, { useState } from 'react';

const App = () => {
  const [buses] = useState([
    { id: 1, company: 'Company A', busNumber: 'ABC-123', status: 'available' },
    { id: 2, company: 'Company A', busNumber: 'ABC-456', status: 'booked' },
    { id: 3, company: 'Company B', busNumber: 'DEF-789', status: 'available' },
    { id: 4, company: 'Company B', busNumber: 'DEF-012', status: 'booked' },
    { id: 5, company: 'Company C', busNumber: 'GHI-345', status: 'available' },
    { id: 6, company: 'Company C', busNumber: 'GHI-678', status: 'booked' },
  ]);

  return (
    <div className="container p-6 bg-main w-full m-5 rounded-xl">
      <h1 className="text-2xl font-bold mb-8 pt-2">Companies Buses</h1>
      <BusList buses={buses} />
    </div>
  );
};

const BusList = ({ buses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {buses.map(bus => (
        <BusCard key={bus.id} bus={bus} />
      ))}
    </div>
  );
};

const BusCard = ({ bus }) => {
  const { company, busNumber, status } = bus;

  const statusClass = status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div 
      className={`bus-card ${statusClass} p-4 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl`}
    >
      <h3 className="text-xl font-semibold">{busNumber}</h3>
      <p className="text-gray-700">Company: {company}</p>
      <p className="text-gray-700">Status: {status.charAt(0).toUpperCase() + status.slice(1)}</p>
    </div>
  );
};

export default App;
