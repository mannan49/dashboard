import React, { useEffect } from "react";
import Card from "./Card";
import BarChart from "../Charts/BarChart";
import MyRevenueLineChart from "../Charts/BumpChart";
import { useSelector } from "react-redux";
import { analyzeBusRoutes } from "../utils/HelperFunctions";
import LineChart from "../Charts/LineChart";

const AdminDashboard = () => {
  const buses = useSelector((state) => state.buses.data);
  const payments = useSelector((state) => state.payments.data);
  const vehicles = useSelector((state) => state.vehicles.data);
  const drivers = useSelector((state) => state.drivers.data);
  const busesToday = buses.filter(
    (bus) => bus.date.split("T")[0] === new Date().toISOString().split("T")[0]
  );
  console.log("DATA PLAYING", analyzeBusRoutes(buses));
  useEffect(() => {
    console.log("PAYJMENT", payments);
  }, []);
  return (
    <div className="content lg:px-00113164234">
      <div className="m-auto lg:px-8">
        <h1 className="font-bold text-3xl m-3">Admin Dashboard</h1>
        {/* <TestInformation /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Card title="Drivers Registered" number={drivers.length} />
          <Card title="Total Vehicles" number={vehicles.length} />
          <Card title="Today's  Shuttles" number={busesToday.length} />
          <Card title="Total Revenue" number={payments.total} />
        </div>
        <div className="lg:flex mt-4 px-0.5">
          <BarChart />
          <MyRevenueLineChart />
        </div>
        <div className="lg:flex my-4 h-full">
          <LineChart />
        </div>
        <div className="pt-4">{/* <CompanyTable /> */}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
