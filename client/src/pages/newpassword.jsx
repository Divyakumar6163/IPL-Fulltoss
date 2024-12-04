import React, { useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { ToLink } from "../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../util/notify";
import Spinner from "../util/spinner";
function SetNewPassword() {
  const [newPassword, setnewPassword] = useState("");
  const [newconfPassword, setnewconfPassword] = useState("");
  const navigate = useNavigate();
  const { token, userId } = useParams();
  const [loading, setLoading] = useState(false);
  async function resetdetails(e) {
    e.preventDefault();
    if (newPassword !== newconfPassword) {
      window.alert("Password not matches with confirm password");
      return;
    }
    try {
      const data = {
        userId: userId,
        token: token,
        password: newPassword,
      };
      setLoading(true);
      await axios.post(`${ToLink}/resetpassword`, data, {
        withCredentials: true,
      });
      notify("Password changed.. please login");
      navigate("/login");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notify(e);
    }
  }
  return (
    <>
      <NavBar />
      <section
        className=" dark:bg-gray-900 min-h-screen flex items-center justify-center"
        style={{ alignItems: "center", justifySelf: "center" }}
      >
        <div
          className="bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style={{ alignItems: "center", justifySelf: "center" }}
        >
          <div
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            style={{ alignItems: "center", justifySelf: "center" }}
          >
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Set your password
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setnewPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setnewconfPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <button
                type="submit"
                onClick={resetdetails}
                className="w-full text-white flex justify-around bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <Spinner /> : "Sumbit"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t want to forgot?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default SetNewPassword;
