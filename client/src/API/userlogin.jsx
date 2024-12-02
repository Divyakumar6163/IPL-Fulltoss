import axios from "axios";
import { store } from "./../store/store";
import * as useractions from "./../store/actions/userinfoactions";
import { ToLink } from "../App";
import * as authactions from "./../store/actions/authactions";
export const getuserlogin = async () => {
  try {
    const data = {};
    // console.log(response.data);
    const response = await axios.post(`${ToLink}/user/login`, data, {
      withCredentials: true,
    });
    console.log(response.cookie);
    store.dispatch(useractions.setuserinfo(response.data.data));
    store.dispatch(useractions.setlogin(true));
    console.log(response.data);
  } catch (e) {
    console.log("Erron in Login", e);
  }
};
export const checktoken = async (accessToken, refreshToken) => {
  console.log(accessToken);
  // console.log(refreshToken);
  try {
    const response = await axios.get(`${ToLink}/authcheck`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    if (response.status === 200) {
      // return response;
      store.dispatch(useractions.setuserinfo(response.data.data.user));
      store.dispatch(useractions.setlogin(true));
    }
    // console.log(response.status)
    if (response.status === 401 || response.status === 403) {
      console.log(refreshToken);
      const refreshResponse = await axios.post(`${ToLink}/authcheck/refresh`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { token: refreshToken },
      });
      console.log(refreshResponse.data.accessToken);
      if (refreshResponse.status === 200) {
        console.log(refreshResponse.data);
        const newAccessToken = refreshResponse.data.accessToken;
        store.dispatch(authactions.setAccessToken(newAccessToken));
        // store.dispatch(authactions.setRefreshToken(refreshResponse.data.refreshToken));

        const retryResponse = await axios.get(`${ToLink}/authcheck`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        // return retryResponse;
        console.log(retryResponse.data);
      } else {
        store.dispatch(authactions.setAccessToken(null));
        store.dispatch(authactions.setRefreshToken(null));
      }
    }
  } catch (e) {
    console.error("An error occurred while checking the tokens:", e);
  }
};
export const updateProfile = async (userInfo, accessToken) => {
  try {
    let profileImageUrl = userInfo.profileImage;
    if (userInfo.profileImage instanceof File) {
      const formData = new FormData();
      formData.append("image", userInfo.profileImage);
      const uploadResponse = await axios.post(`${ToLink}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      profileImageUrl = await uploadResponse.data.fileUrl;
    }
    const profileInfo = {
      ...userInfo,
      profileImage: profileImageUrl,
    };
    console.log(profileInfo.profileImage);
    // console.log(profileInfo);
    const response = await axios.post(`${ToLink}/user/profile`, profileInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const imglink = await response.data.data.profileImage;
    console.log(imglink);
    return response.data;
  } catch (error) {
    console.error("An error occurred while updating the profile:", error);
  }
};
