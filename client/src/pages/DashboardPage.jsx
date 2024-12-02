// Dashboard.jsx
import React from "react";
import Navbar from "../components/Navbar";
import ProductListing from "../components/ProductListing";
import teamColor from "../data/color";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const Dashboard = () => {
  const team = useSelector((state) => state.user.userinfo.team);
  const teamData = teamColor.find((teamItem) => teamItem.team === team);
  const colors = teamData?.colors;
  console.log(colors);
  return (
    // <>
    <div style={{ background: colors?.background || "#FFFFFF" }}>
      <Navbar />
      <div className="p-6">
        <h1
          className="text-4xl font-bold"
          style={{ color: colors?.heading || "#000000" }} // Default to black if no color
        >
          Welcome to the {teamData?.team} Fan Store!
        </h1>
        <img src={team?.logo} alt={`${team} Logo`} className="w-20 h-20 my-4" />
      </div>
      <ProductListing team={teamData} />
      <Footer />
    </div>
    // </>
  );
};

export default Dashboard;
