import React from 'react';

const buses = [
    {
        busNo: 'Bus No 1',
        route: 'Islamabad to Lahore',
        company: 'Daewoo',
        availability: 'Available',
    },
    {
        busNo: 'Bus No 2',
        route: 'Lahore to Karachi',
        company: 'Faisal Movers',
        availability: 'Booked',
    },
    {
        busNo: 'Bus No 3',
        route: 'Islamabad to Peshawar',
        company: 'Skyways',
        availability: 'Available',
    },
    {
        busNo: 'Bus No 4',
        route: 'Multan to Karachi',
        company: 'Daewoo',
        availability: 'Available',
    },
    {
        busNo: 'Bus No 5',
        route: 'Peshawar to Quetta',
        company: 'Faisal Movers',
        availability: 'Booked',
    },
];

const BusesPage = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full m-5 rounded-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Available Buses</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-md shadow-sm ">
                    Add New Bus
                </button>
            </div>

            {/* Bus Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {buses.map((bus, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold text-gray-900">{bus.busNo}</h2>
                        <p className="text-gray-600 mb-2">{bus.route}</p>
                        <p className="text-gray-600">Company: {bus.company}</p>
                        <p
                            className={`mt-2 text-sm font-medium ${
                                bus.availability === 'Available'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {bus.availability}
                        </p>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300">
                                View Details
                            </button>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusesPage;

