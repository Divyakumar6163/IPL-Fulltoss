import React, { useState, useEffect } from "react";
import { notify } from "../util/notify";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../API/userlogin.jsx";
import * as userinfoactions from "../store/actions/userinfoactions.jsx";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { store } from "./../store/store";
import * as useractions from "./../store/actions/userinfoactions";
import * as authactions from "./../store/actions/authactions";
import { useNavigate } from "react-router";
import teamColor from "../data/color.jsx";
import getTeamImage from "../data/logoFunc.jsx";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const team = useSelector((state) => state.user.userinfo.team);
  const teamData = teamColor.find((teamItem) => teamItem.team === team);
  const myTeam = teamData?.shortTeam;
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [name, setName] = useState(userState.userinfo.name || "");
  const [mobile, setMobile] = useState(userState.userinfo.phoneno || "");
  const [email, setEmail] = useState(userState.userinfo.emailid);
  const [about, setAbout] = useState(userState.userinfo.about || "");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setName(userState.userinfo.name || "");
    setMobile(userState.userinfo.phoneno || "");
    setEmail(userState.userinfo.emailid);
    setAbout(userState.userinfo.about || "");
  }, [userState.userinfo]);

  const handleSave = async () => {
    setIsEditing(false);

    const userInfoUpdate = {
      ...userState.userinfo,
      name,
      phoneno: mobile,
      about,
    };

    try {
      const response = await updateProfile(userInfoUpdate, accessToken);
      if (response.status === "success") {
        notify("Data successfully updated");
        dispatch(userinfoactions.updateUserProfile(userInfoUpdate));
      } else {
        notify("Failed to update user profile");
      }
    } catch (error) {
      notify("An error occurred while updating the user profile");
    }
  };

  const handleSignOut = () => {
    store.dispatch(useractions.setlogin(false));
    store.dispatch(useractions.setuserinfo({}));
    store.dispatch(authactions.setAccessToken(null));
    store.dispatch(authactions.setRefreshToken(null));
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-gray-100 flex flex-col items-center p-6"
        style={{ background: `${teamData?.colors.background}` }}
      >
        <div
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl"
          style={{ background: `${teamData?.colors.card}` }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              style={{ background: `${teamData?.colors.button}` }}
            >
              {isEditing ? "Update" : "Edit"}
            </button>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-blue-500">
              {getTeamImage(myTeam) ? (
                <img
                  src={getTeamImage(myTeam)}
                  alt="Team Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 flex items-center justify-center h-full">
                  No Image
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-gray-600 font-semibold">Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                />
              ) : (
                <p className="text-gray-800">{name}</p>
              )}
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Mobile:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                />
              ) : (
                <p className="text-gray-800">{mobile}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600 font-semibold">Email:</label>
              <p className="text-gray-800">{email}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">My Team:</label>
              <p className="text-gray-800">{teamData?.team}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">About Me:</label>
              {isEditing ? (
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none"
                  rows="4"
                />
              ) : (
                <p className="text-gray-800">{about}</p>
              )}
            </div>
          </div>

          <div className="w-full max-w-2xl mt-8 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              onClick={handleSignOut}
              style={{
                background: `${teamData?.colors.button}`,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
