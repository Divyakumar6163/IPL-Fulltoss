import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { store } from "./../store/store";
import * as useractions from "../store/actions/userinfoactions";
import * as authactions from "../store/actions/authactions";
import { useSelector } from "react-redux";
import teamColor from "../data/color.jsx";
import getTeamImage from "../data/logoFunc.jsx";

export default function NavBar1() {
  const navigate = useNavigate();
  const team = useSelector((state) => state.user.userinfo?.team);
  const teamData = teamColor.find((teamItem) => teamItem.team === team);
  const myTeam = teamData?.shortTeam;
  const userState = useSelector((state) => state.user);
  const islogin = useSelector((state) => state.user.islogin);
  const username = useSelector((state) => state.user.userinfo?.name);
  const handleSignOut = () => {
    navigate("/");
    store.dispatch(useractions.setlogin(false));
    store.dispatch(useractions.setuserinfo({}));
    store.dispatch(authactions.setAccessToken(null));
    store.dispatch(authactions.setRefreshToken(null));
  };

  function handleProfile() {
    navigate("/profile");
  }

  function handleDashboard() {
    navigate("/dashboard");
  }
  return (
    <Navbar fluid>
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
        <span
          className="self-center whitespace-nowrap text-4xl font-extrabold tracking-wide text-gradient dark:text-white transition-all hover:scale-105"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          FullToss
        </span>
      </Navbar.Brand>
      {islogin && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={getTeamImage(myTeam)} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{username}</span>
              <span className="block truncate text-sm font-medium">
                {userState.userinfo.emailid}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleDashboard}>Dashboard</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )}
      <Navbar.Collapse>
        <Navbar.Link>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            About
          </Link>
        </Navbar.Link>

        <Navbar.Link>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              const aboutSection = document.getElementById("contact");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Contact
          </Link>
        </Navbar.Link>

        <Navbar.Link>
          <Link to={islogin ? "/dashboard" : "/login"}>
            {islogin ? "Dashboard" : "Register/Login"}
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
