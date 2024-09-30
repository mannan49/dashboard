import React, { useState } from 'react';

// Mock Data for payments
const mockPayments = [
  { id: 'P001', user: 'John Doe', amount: 100, status: 'Completed', date: '2024-09-01' },
  { id: 'P002', user: 'Jane Smith', amount: 250, status: 'Pending', date: '2024-09-02' },
  { id: 'P003', user: 'Chris Johnson', amount: 500, status: 'Failed', date: '2024-09-03' },
  { id: 'P004', user: 'Emma Watson', amount: 120, status: 'Completed', date: '2024-09-04' },
  { id: 'P005', user: 'James Bond', amount: 150, status: 'Pending', date: '2024-09-05' },
  // Add more sample data as needed
];

const PaymentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter payments based on search term and status
  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) || payment.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container p-6 bg-main w-full lg:m-5 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Payments</h1>

      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by user or payment ID..."
          className="border border-gray-300 rounded-lg p-2 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border">Payment ID</th>
              <th className="p-4 border">User</th>
              <th className="p-4 border">Amount</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="p-4 border">{payment.id}</td>
                <td className="p-4 border">{payment.user}</td>
                <td className="p-4 border">${payment.amount}</td>
                <td className={`p-4 border ${payment.status === 'Completed' ? 'text-green-600' : payment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {payment.status}
                </td>
                <td className="p-4 border">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentPage;
