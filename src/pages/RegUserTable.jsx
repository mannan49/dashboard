import React from "react";

const users = [
  {
    email: "samantha.jones@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "123",
    lastActivity: "3 days ago",
  },
  {
    email: "mike.smith@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "1212",
    lastActivity: "1 month ago",
  },
  {
    email: "kelly.wang@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "121",
    lastActivity: "Just now",
  },
  {
    email: "david.chen@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "212",
    lastActivity: "1 year ago",
  },
  {
    email: "emily.liu@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "212",
    lastActivity: "1 week ago",
  },
  {
    email: "ryan.murphy@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "343",
    lastActivity: "2 months ago",
  },
  {
    email: "john.doe@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "456",
    lastActivity: "4 days ago",
  },
  {
    email: "jane.doe@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "789",
    lastActivity: "5 days ago",
  },
  {
    email: "alice.johnson@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "1111",
    lastActivity: "3 weeks ago",
  },
  {
    email: "bob.brown@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "2222",
    lastActivity: "6 days ago",
  },
  {
    email: "carol.white@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "3333",
    lastActivity: "2 weeks ago",
  },
  {
    email: "daniel.taylor@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "4444",
    lastActivity: "1 month ago",
  },
  {
    email: "eva.kim@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "5555",
    lastActivity: "7 days ago",
  },
  {
    email: "frank.martin@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "6666",
    lastActivity: "8 days ago",
  },
  {
    email: "grace.lee@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "7777",
    lastActivity: "2 months ago",
  },
  {
    email: "hank.moore@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "8888",
    lastActivity: "1 month ago",
  },
  {
    email: "irene.morris@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "9999",
    lastActivity: "4 days ago",
  },
  {
    email: "jackson.james@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "1000",
    lastActivity: "1 year ago",
  },
  {
    email: "karen.clark@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "2000",
    lastActivity: "6 days ago",
  },
  {
    email: "leo.walker@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "3000",
    lastActivity: "3 weeks ago",
  },
  {
    email: "mia.wright@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "4000",
    lastActivity: "Just now",
  },
  {
    email: "noah.hall@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "5000",
    lastActivity: "5 days ago",
  },
  {
    email: "olivia.green@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "6000",
    lastActivity: "1 month ago",
  },
  {
    email: "peter.adams@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "7000",
    lastActivity: "6 months ago",
  },
  {
    email: "quinn.davis@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "8000",
    lastActivity: "2 months ago",
  },
  {
    email: "rachel.baker@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "9000",
    lastActivity: "1 week ago",
  },
  {
    email: "samuel.jones@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "10000",
    lastActivity: "4 days ago",
  },
  {
    email: "tina.carter@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "11000",
    lastActivity: "3 days ago",
  },
  {
    email: "ursula.martinez@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "12000",
    lastActivity: "2 weeks ago",
  },
  {
    email: "victor.ramirez@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "13000",
    lastActivity: "5 days ago",
  },
  {
    email: "wendy.hernandez@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "14000",
    lastActivity: "1 month ago",
  },
  {
    email: "xander.gonzalez@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "15000",
    lastActivity: "3 days ago",
  },
  {
    email: "yara.phillips@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "16000",
    lastActivity: "2 months ago",
  },
  {
    email: "zachary.fisher@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "17000",
    lastActivity: "7 days ago",
  },
  {
    email: "aiden.grant@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "18000",
    lastActivity: "1 year ago",
  },
  {
    email: "bella.hughes@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "19000",
    lastActivity: "6 days ago",
  },
  {
    email: "cameron.ross@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "20000",
    lastActivity: "1 month ago",
  },
  {
    email: "diana.hall@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "21000",
    lastActivity: "Just now",
  },
  {
    email: "edward.bennett@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "22000",
    lastActivity: "2 weeks ago",
  },
  {
    email: "fiona.campbell@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "23000",
    lastActivity: "6 days ago",
  },
  {
    email: "george.morris@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "24000",
    lastActivity: "5 days ago",
  },
  {
    email: "hannah.mitchell@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "25000",
    lastActivity: "3 days ago",
  },
  {
    email: "ian.turner@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "26000",
    lastActivity: "1 month ago",
  },
  {
    email: "julia.hall@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "27000",
    lastActivity: "2 months ago",
  },
  {
    email: "kyle.wilson@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "28000",
    lastActivity: "Just now",
  },
  {
    email: "laura.moore@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "29000",
    lastActivity: "3 weeks ago",
  },
  {
    email: "matthew.wood@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "30000",
    lastActivity: "1 year ago",
  },
  {
    email: "nina.perez@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "31000",
    lastActivity: "4 days ago",
  },
  {
    email: "oliver.brown@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "32000",
    lastActivity: "7 days ago",
  },
  {
    email: "penny.kelly@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "33000",
    lastActivity: "2 months ago",
  },
  {
    email: "quincy.james@gmail.com",
    password: "**********",
    role: "User",
    cardNumber: "34000",
    lastActivity: "5 days ago",
  },
  {
    email: "riley.adams@gmail.com",
    password: "**********",
    role: "Admin",
    cardNumber: "35000",
    lastActivity: "1 week ago",
  },
];

const UserTable = () => {
  return (
    <div className="content">
      <div className="container mx-auto py-8 bg-main m-5 rounded-lg">
        {/* Header with Invite Button */}
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0 sm:pl-4">Users</h1>
          <button className="bg-primary text-main font-bold py-2 px-4 rounded-lg mb-4 sm:mb-0 sm:mr-4">
            Invite Users
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
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
                        user.role === "Admin" ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{user.cardNumber}</td>
                  <td className="py-2 px-4 border-b">{user.lastActivity}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
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
