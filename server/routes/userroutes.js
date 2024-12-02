const express = require("express");
const usercontroller = require("../controller/usercontroller");
const authcontroller = require("../controller/authservice");

// const userbookcontroller = require("./../controllers/user/userbookcontroller");

const router = express.Router();

router.get("/alluser", usercontroller.getallusers);
router.post("/user/register", usercontroller.createUsers);

router.post("/user/login", usercontroller.userlogin);
// router.post("/user/login", authcontroller.checkauth, usercontroller.userlogin);

router.get("/getuser/:id", usercontroller.getuserinfo);

router.post("/reqresetpassword", authcontroller.requestresetuserpassword);

router.post("/resetpassword", authcontroller.resetpassword);

router.get("/getresettoken", authcontroller.getallresettoken);

router.post("/verifyemail", usercontroller.verifyuseremail);

// router.post(
//   "/user/profile",
//   // authcontroller.checkvaliduser,
//   userbookcontroller.profile
// );

// router.post("/:userID/wishlist", userbookcontroller.addToWishlist);

// router.get("/:userID/wishlist", userbookcontroller.getWishlistBooks);

// router.delete("/:userID/wishlist", userbookcontroller.removeFromWishlist);

// router.post("/auth/google", usercontroller.googleLoginSignup);

router.get("/authcheck", authcontroller.checkaccesstoken);

router.post("/authcheck/refresh", authcontroller.refreshAccessToken);

module.exports = router;
