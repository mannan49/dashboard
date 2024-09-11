import React from "react";
// import TestInformation from "./TestInformation";
import Card from "./Card";
import BarChart from "../Charts/BarChart";
const MainContent = () => {
  return (
    <div className="content flex-grow p-4 overflow-y-auto">
      <h1 className="font-bold text-3xl">Admin Dashboard</h1>
      {/* <TestInformation /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="mt-5">

      <BarChart/>
      </div>
    </div>
  );
};

export default MainContent;
