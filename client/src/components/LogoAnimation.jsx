import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Dashboard from "../pages/DashboardPage";
import { useSelector } from "react-redux";
import teamColor from "../data/color";

const LogoAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const team = useSelector((state) => state.user.userinfo.team);
  const teamData = teamColor.find((teamItem) => teamItem.team === team);

  useEffect(() => {
    const animationFlag = localStorage.getItem("showAnimationAfterLogin");

    if (animationFlag === "true") {
      setShowAnimation(true);
      localStorage.removeItem("showAnimationAfterLogin");
    }
  }, []);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const logoVariants = {
    initial: { opacity: 0, y: -100, rotate: -90 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: 100, rotate: 90 },
  };

  return (
    <>
      {showAnimation ? (
        <div className="relative flex items-center justify-center h-screen">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-md z-0"></div>
          {teamData?.logo && (
            <motion.img
              src={teamData.logo}
              alt={`${teamData.fullTeam} Logo`}
              className="w-40 h-40 rounded-full border-4 z-10"
              style={{ borderColor: teamData.colors?.border || "#FFFFFF" }}
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                rotate: { duration: 1.5, ease: "easeInOut" },
              }}
            />
          )}
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default LogoAnimation;
