// Dashboard.jsx
import React from "react";
import Navbar from "../components/Navbar";
import ProductListing from "../components/ProductListing";

const Dashboard = ({ user }) => {
  const { team } = user;

  return (
    <div className={`min-h-screen bg-${team.color}-500 text-white`}>
      <Navbar />
      <div className="p-6">
        <h1 className="text-4xl font-bold">
          Welcome to the {team.name} Fan Store!
        </h1>
        <img
          src={team.logo}
          alt={`${team.name} Logo`}
          className="w-20 h-20 my-4"
        />
      </div>
      <ProductListing team={team} />
    </div>
  );
};

export default Dashboard;
