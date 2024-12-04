import axios from "axios";
import { store } from "./../store/store";
import * as useractions from "./../store/actions/userinfoactions";
import { ToLink } from "../App";
import * as authactions from "./../store/actions/authactions";
export const getuserlogin = async () => {
  try {
    const data = {};
    const response = await axios.post(`${ToLink}/user/login`, data, {
      withCredentials: true,
    });
    store.dispatch(useractions.setuserinfo(response.data.data));
    store.dispatch(useractions.setlogin(true));
  } catch (e) {}
};
export const checktoken = async (accessToken, refreshToken) => {
  try {
    const response = await axios.get(`${ToLink}/authcheck`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      store.dispatch(useractions.setuserinfo(response.data.data.user));
      store.dispatch(useractions.setlogin(true));
    }
    if (response.status === 401 || response.status === 403) {
      const refreshResponse = await axios.post(`${ToLink}/authcheck/refresh`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { token: refreshToken },
      });
      if (refreshResponse.status === 200) {
        const newAccessToken = refreshResponse.data.accessToken;
        store.dispatch(authactions.setAccessToken(newAccessToken));

        await axios.get(`${ToLink}/authcheck`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else {
        store.dispatch(authactions.setAccessToken(null));
        store.dispatch(authactions.setRefreshToken(null));
      }
    }
  } catch (e) {}
};
export const updateProfile = async (userInfo, accessToken) => {
  try {
    const response = await axios.post(`${ToLink}/user/profile`, userInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {}
};
