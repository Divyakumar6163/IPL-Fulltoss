import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { ToLink } from "../App";
import axios from "axios";
import { notify } from "../util/notify";
import Spinner from "../util/spinner";
import color from "../data/color";
import getTeamImage from "../data/logoFunc.jsx";

function VerifyEmail() {
  const { token } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post(
          `${ToLink}/verifyemail`,
          { token },
          { withCredentials: true }
        );

        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          const team = JSON.parse(storedUserInfo);
          setTeam(team);
          notify("Your assigned team is " + team.team);
          localStorage.removeItem("userInfo");
        }

        setIsVerified(true);
      } catch (error) {
        // notify("Verification failed or link expired. Please try again.");
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  const myTeam = color.filter((t) => t.team === team?.team);

  return (
    <>
      <NavBar />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: `${myTeam[0]?.colors?.background}`,
        }}
      >
        {loading ? (
          <Spinner />
        ) : isVerified ? (
          <div style={{ textAlign: "center" }}>
            {team && myTeam[0]?.logo && (
              <img
                src={getTeamImage(myTeam[0].shortTeam)}
                alt={`${team.team} Logo`}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  border: `4px solid ${myTeam[0]?.colors?.border}`,
                  display: "block",
                  margin: "0 auto",
                }}
              />
            )}
            <h2
              style={{
                color: `${myTeam[0]?.colors?.text}`,
                fontSize: 25,
              }}
            >
              Email verified. Please login!
            </h2>
            {team && (
              <p
                style={{
                  color: `${myTeam[0]?.colors?.paragraph}`,
                  fontSize: 35,
                  marginTop: "10px",
                }}
              >
                You have been assigned to the team: <strong>{team.team}</strong>
              </p>
            )}
          </div>
        ) : (
          <div>
            <h2
              style={{
                color: "white",
                fontSize: 25,
              }}
            >
              Verification Failed
            </h2>
            <p
              style={{
                color: "white",
                fontSize: 25,
                marginTop: "10px",
              }}
            >
              The link is expired or invalid. Please try again.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default VerifyEmail;
