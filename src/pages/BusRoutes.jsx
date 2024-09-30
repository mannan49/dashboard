import React from "react";

// const CompaniesPage = () => {
//   return (
//     <div className="content flex-grow flex flex-col items-center p-4 overflow-y-auto">
//       <h1>This is Companies Page. </h1>
//       <p>Inshallah content related to Companies will be uploaded here</p>
//       <p className="app-btn">Coming Soon</p>
//     </div>
//   );
// };

// export default CompaniesPage;

const routes = [
  {
    category: "Total Routes",
    routes: [
      {
        name: "Route 1: Islamabad to Lahore",
        description: "Islamabad to Lahore",
        buses: "10",
      },
      {
        name: "Route 2: Lahore to Karachi",
        description: "Lahore to Karachi",
        buses: "10",
      },
    ],
  },
  {
    category: "Active Routes",
    routes: [
      {
        name: "Route 1: Islamabad to Lahore",
        company: "Daewoo",
        bus: "Bus No 2",
      },
      {
        name: "Route 2: Lahore to Karachi",
        company: "Faisal Movers",
        bus: "Bus No 2",
      },
    ],
  },
];

const BusRoutes = () => {
  return (
    <div className="content mx-2">
      <div className="p-6 bg-main min-h-screen w-full mx-auto rounded-xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Routes</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary">
            New route
          </button>
        </div>

        {/* Route Categories */}
        {routes.map((section, index) => (
          <div key={index} className="mb-8">
            {/* Section Heading */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {section.category}
            </h2>

            {/* Route Details */}
            {section.routes.map((route, idx) => (
              <div key={idx} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{route.name}</h3>
                  {route.description && (
                    <p className="text-gray-600 text-sm">{route.description}</p>
                  )}
                  {route.buses && (
                    <p className="text-gray-600 text-sm">
                      Number of buses: {route.buses}
                    </p>
                  )}
                  {route.company && (
                    <>
                      <p className="text-gray-600 text-sm">{route.company}</p>
                      <p className="text-gray-600 text-sm">{route.bus}</p>
                    </>
                  )}
                </div>
                {/* View Details Button */}
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300">
                  View details
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusRoutes;
