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

  return (
    <div style={{ background: colors?.background || "#FFFFFF" }}>
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-center space-x-4">
          {teamData?.logo && (
            <img
              src={teamData.logo}
              alt={`${teamData.fullTeam} Logo`}
              className="w-16 h-16 rounded-full border-4"
              style={{
                borderColor: colors?.border || "#000000",
              }}
            />
          )}
          <h1
            className="text-4xl font-bold text-center"
            style={{ color: colors?.heading || "#000000" }}
          >
            Welcome to the {teamData?.fullTeam} Fan Store!
          </h1>
          {teamData?.logo && (
            <img
              src={teamData.logo}
              alt={`${teamData.fullTeam} Logo`}
              className="w-16 h-16 rounded-full border-4"
              style={{
                borderColor: colors?.border || "#000000",
              }}
            />
          )}
        </div>
      </div>
      <ProductListing team={teamData} />
      <Footer />
    </div>
  );
};

export default Dashboard;
