import React from 'react';

const companies = [
    { name: 'Express', buses: 750, routes: '3,000', location: 'US', revenue: '$17M' },
    { name: 'Transit', buses: 500, routes: '2,000', location: 'US', revenue: '$12M' },
    { name: 'Metro', buses: 250, routes: '1,000', location: 'US', revenue: '$8M' },
    { name: 'Shuttle', buses: 750, routes: '3,000', location: 'US', revenue: '$17M' },
    { name: 'Coach', buses: 250, routes: '1,000', location: 'US', revenue: '$8M' },
];

const CompanyTable = () => (
    <div className="p-6 bg-main rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Companies</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Buses</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Routes</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <tr key={index} className="border-b border-gray-300">
                            <td className="py-3 px-4 text-gray-700">{company.name}</td>
                            <td className="py-3 px-4 text-gray-700">{company.buses}</td>
                            <td className="py-3 px-4 text-gray-700">{company.routes}</td>
                            <td className="py-3 px-4 text-gray-700">{company.location}</td>
                            <td className="py-3 px-4 text-gray-700">{company.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default CompanyTable;
