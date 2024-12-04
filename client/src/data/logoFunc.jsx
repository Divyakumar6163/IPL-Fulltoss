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
const getTeamImage = (myTeam) => {
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
    case "PBKS":
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
export default getTeamImage;
