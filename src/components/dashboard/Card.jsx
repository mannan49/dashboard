import React from "react";

const Card = () => {
  return (
    <>
      <div className="border shadow-md p-4 rounded-lg text-center bg-main">
        <p className="text-lg font-medium">Total Buses</p>
        <span className="text-2xl font-bold">2500</span>
        <p className="text-tertiary text-lg">+5%</p>
      </div>
    </>
  );
};

export default Card;
