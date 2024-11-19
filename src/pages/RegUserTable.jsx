import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../components/apis/setting";
import { formatPhoneNumber } from "../components/utils/utilityFunctions.";


const UserTable = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiBaseUrl}/user/req`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="content">
      <div className="container mx-auto py-8 bg-main m-5 rounded-lg">
        {/* Header with Invite Button */}
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0 sm:pl-4">Users</h1>
          {/* <button className="bg-primary text-main font-bold py-2 px-4 rounded-lg mb-4 sm:mb-0 sm:mr-4">
            Invite Users
          </button> */}
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Card Number</th>
                <th className="py-2 px-4 border-b">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{formatPhoneNumber(user.phoneNumber)}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`py-1 px-3 rounded-full text-white ${
                        user.role === "Admin" ? "bg-gray-500" : "bg-primary"
                      }`}
                    >
                      User
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{user.cardNumber}</td>
                  <td className="py-2 px-4 border-b">{user.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
