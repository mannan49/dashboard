import React from 'react';

const users = [
  {
    email: 'samantha.jones@gmail.com',
    password: '**********',
    role: 'Admin',
    cardNumber: '123',
    lastActivity: '3 days ago',
  },
  {
    email: 'mike.smith@gmail.com',
    password: '**********',
    role: 'User',
    cardNumber: '1212',
    lastActivity: '1 month ago',
  },
  {
    email: 'kelly.wang@gmail.com',
    password: '**********',
    role: 'User',
    cardNumber: '121',
    lastActivity: 'Just now',
  },
  {
    email: 'david.chen@gmail.com',
    password: '**********',
    role: 'User',
    cardNumber: '212',
    lastActivity: '1 year ago',
  },
  {
    email: 'emily.liu@gmail.com',
    password: '**********',
    role: 'Admin',
    cardNumber: '212',
    lastActivity: '1 week ago',
  },
  {
    email: 'ryan.murphy@gmail.com',
    password: '**********',
    role: 'User',
    cardNumber: '343',
    lastActivity: '2 months ago',
  },
];

const UserTable = () => {
  return (
    <div className="container py-8 bg-main m-5 rounded-lg ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 pl-4">Users</h1>
        <button className="bg-primary text-main font-bold py-2 px-4 rounded-lg mr-2 mb-4">
          Invite Users
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Password</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Card Number</th>
            <th className="py-2 px-4 border-b">Last Activity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.password}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`py-1 px-3 rounded-full text-white ${
                    user.role === 'Admin' ? 'bg-primary' : 'bg-gray-500'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{user.cardNumber}</td>
              <td className="py-2 px-4 border-b">{user.lastActivity}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
