import React, { useState, useEffect } from "react";
import { notify } from "../store/utils/notify";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../API/userlogin.jsx";
import * as userinfoactions from "../store/actions/userinfoactions.jsx";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { store } from "./../store/store";
import * as useractions from "./../store/actions/userinfoactions";
import * as authactions from "./../store/actions/authactions";
import * as bookactions from "./../store/actions/bookactions";
import { useNavigate } from "react-router";
import { ToLink } from "../App.js";
import axios from "axios";
const UserProfile = () => {
  const [userState, setUserState] = useState({ userinfo: null });
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(userState.userinfo.name || "");
  const [mobile, setMobile] = useState(userState.userinfo.phoneno || "");
  const [email, setEmail] = useState(userState.userinfo.emailid); // Email is not editable
  const [about, setAbout] = useState(userState.userinfo.about || "");
  const [profileImage, setProfileImage] = useState(
    userState.userinfo.profile || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showUploadInput, setShowUploadInput] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ToLink}/user/register`); // Replace with your backend API endpoint
        setUserState({ userinfo: response.data });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userState.userinfo]);

  const handleSave = async () => {
    setIsEditing(false);

    const userInfoUpdate = {
      ...userState.userinfo,
      name,
      phoneno: mobile,
      about,
      profileImage,
    };
    // try {
    //   const response = await updateProfile(userInfoUpdate, accessToken);
    //   console.log(response.data.profileImage);
    //   const profileInfo = {
    //     ...userState.userinfo,
    //     profileImage: response.data.profileImage,
    //   };
    //   if (response.status === "success") {
    //     notify("Data successfully updated");
    //   } else {
    //     notify("Failed to update user profile");
    //   }
    // } catch (error) {
    //   console.error("Error in profile updation", error);
    //   notify("An error occurred while updating the user profile");
    // }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // if (file) {
    setProfileImage(file);
    // }
    setShowUploadInput(false);
  };

  const handleSignOut = () => {
    store.dispatch(useractions.setlogin(false));
    store.dispatch(useractions.setuserinfo({}));
    store.dispatch(authactions.setAccessToken(null));
    store.dispatch(authactions.setRefreshToken(null));
    store.dispatch(bookactions.setBookDetails(null));
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              {isEditing ? "Update" : "Edit"}
            </button>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-blue-500">
              {profileImage && typeof profileImage === "string" ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 flex items-center justify-center h-full">
                  No Image
                </span>
              )}
              {isEditing && (
                <>
                  <button
                    onClick={() => setShowUploadInput(true)}
                    className="absolute bottom-2 right-1.5 bg-blue-500 p-1 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M6 18v3h3l10.39-10.39a2.5 2.5 0 00-3.536-3.536L6 15.293z"
                      />
                    </svg>
                  </button>
                  {showUploadInput && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      title="Upload Profile Image"
                    />
                  )}
                </>
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
            {" "}
            {/* Added flex and justify-end here */}
            <button
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              onClick={handleSignOut}
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
