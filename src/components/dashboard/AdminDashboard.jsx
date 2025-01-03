import React from "react";
import Card from "./Card";
import BarChart from "../Charts/BarChart";
import MyRevenueLineChart from "../Charts/BumpChart";
import CompanyTable from "./TableCompanies";

const AdminDashboard = () => {
  return (
    <div className="content lg:px-00113164234">
      <div className="m-auto lg:px-8">
        <h1 className="font-bold text-3xl m-3">Admin Dashboard</h1>
        {/* <TestInformation /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="lg:flex mt-4">
          <BarChart />
          <MyRevenueLineChart />
        </div>
        <div className="pt-4">
          <CompanyTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
