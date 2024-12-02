import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { store } from "./../store/store";
import * as useractions from "../store/actions/userinfoactions";
import * as authactions from "../store/actions/authactions";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToLink } from "../App";
import axios from "axios";
import { notify } from "../util/notify";
import Dashboard from "../pages/DashboardPage";
import teamColor from "../data/color.jsx";
import MI from "../images/teamLogo/mi.png";
import CSK from "../images/teamLogo/csk.jpg";
import GT from "../images/teamLogo/gt.png";
import DC from "../images/teamLogo/dc.jpg";
import KKR from "../images/teamLogo/kkr.jpg";
import KP from "../images/teamLogo/pk.png";
import LSG from "../images/teamLogo/lsg.png";
import RR from "../images/teamLogo/rr.png";
import RCB from "../images/teamLogo/rcb.jpg";
import SRH from "../images/teamLogo/srh.png";

export default function NavBar1() {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [isSearch, setIsSearch] = useState(false);
  const team = useSelector((state) => state.user.userinfo.team);
  const teamData = teamColor.find((teamItem) => teamItem.team === team);
  const myTeam = teamData?.shortTeam;
  // const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // const [searchBooks, setSearchBooks] = useState([]);
  const userState = useSelector((state) => state.user);
  const islogin = useSelector((state) => state.user.islogin);
  const username = useSelector((state) => state.user.userinfo.name);
  const profile = useSelector((state) => state.user.userinfo.profileImage);
  console.log(islogin);

  // const handleIsSearch = () => {
  //   setIsSearch(!isSearch);
  // };

  const handleSignOut = () => {
    store.dispatch(useractions.setlogin(false));
    store.dispatch(useractions.setuserinfo({}));
    store.dispatch(authactions.setAccessToken(null));
    store.dispatch(authactions.setRefreshToken(null));
  };

  // const handleSearch = async () => {
  //   console.log(search);
  //   if (search.trim() === "") {
  //     notify("Please enter a search");
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(`${ToLink}/search`, {
  //       params: { search },
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     navigate("/searchBooks");
  //     // setSearchBooks(res.data.data.books);
  //     console.log(res.data.data.books); // Log books
  //   } catch (error) {
  //     console.error(
  //       "Error searching for books:",
  //       error.response?.data?.message || error.message
  //     );
  //   }
  // };
  const getTeamImage = () => {
    switch (myTeam) {
      case "MI":
        return MI;
      case "RCB":
        return RCB;
      case "CSK":
        return CSK;
      case "DC":
        return DC;
      case "KKR":
        return KKR;
      case "KP":
        return KP;
      case "LSG":
        return LSG;
      case "RR":
        return RR;
      case "SRH":
        return SRH;
      case "GT":
        return GT;
      default:
        return null;
    }
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
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          FullToss
        </span>
      </Navbar.Brand>
      {islogin && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={getTeamImage()} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{username}</span>
              <span className="block truncate text-sm font-medium">
                {userState.userinfo.emailid}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleDashboard}>Dashboard</Dropdown.Item>
            {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
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
          <Link to="/">About</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/">Contact Us</Link>
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
