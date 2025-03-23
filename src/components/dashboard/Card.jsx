import React from "react";

const Card = ({title, number}) => {
  return (
    <>
      <div className="border shadow-md p-4 rounded-lg text-center bg-main">
        <p className="text-lg font-medium">{title}</p>
        <span className="text-2xl font-bold">{number}</span>
        <p className="text-tertiary text-lg">+5%</p>
      </div>
    </>
  );
};

export default Card;
