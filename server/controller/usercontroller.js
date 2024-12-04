const userSchema = require("../model/usermodel");
const DummyUser = require("../model/unverifiedusermodel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const verifyemail = require("../utils/verifyemailmail");
const welcomeemail = require("../utils/welcomemail");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const auth = require("../controller/authservice");
const { promisify } = require("util");
const validator = require("validator");
const { console } = require("inspector");
exports.getallusers = async (req, res) => {
  try {
    const alluser = await userSchema.find();
    return res.status(200).json({
      status: "success",
      data: {
        alluser: alluser,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error While fetching data",
      error: err,
    });
  }
};
exports.createUsers = async (req, res) => {
  console.log(req.body);
  try {
    const user = await userSchema.findOne({ emailid: req.body.emailid });
    console.log(user);
    if (!validator.isEmail(req.body.emailid)) {
      return res.status(403).json({
        message: "Please enter valid email",
      });
    }
    if (user && !user.issetuppassword) {
      const obj = {
        name: user.name,
        emailid: user.emailid,
        password: req.body.password,
        team: req.body.team,
      };
      const newuser = await DummyUser.create(obj);
      // user.issetuppassword = true
      const newAccessToken = JWT.sign(
        { id: newuser._id },
        process.env.ACCESS_JWT_SECRET,
        {
          expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
        }
      );
      const link = `${process.env.FRONT_END_LINK}/verifyemail/${newAccessToken}`;
      await verifyemail({
        email: obj.emailid,
        subject: "Verify your email",
        name: obj.name,
        verificationLink: link,
      });
      return res.status(201).json({
        status: "Please verify your email",
        data: {
          user: user,
        },
      });
    } else {
      if (user) {
        return res.status(500).json({
          message: "This email already exists",
        });
      }
      const newuser = await DummyUser.create(req.body);
      console.log(newuser);
      const newAccessToken = JWT.sign(
        { id: newuser._id },
        process.env.ACCESS_JWT_SECRET,
        {
          expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
        }
      );
      const link = `${process.env.FRONT_END_LINK}/verifyemail/${newAccessToken}`;
      await verifyemail({
        email: newuser.emailid,
        subject: "Verify your email",
        name: newuser.name,
        verificationLink: link,
      });
      return res.status(201).json({
        status: "Please verify your email",
        data: {
          user: newuser,
        },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Error while creating users",
      error: err,
    });
  }
};
exports.verifyuseremail = async (req, res) => {
  try {
    const decoded = await promisify(JWT.verify)(
      req.body.token,
      process.env.ACCESS_JWT_SECRET
    );
    const userinfo = await DummyUser.findById(decoded.id);
    const exituser = await userSchema.find({ emailid: userinfo.emailid });
    console.log(exituser[0]);
    if (exituser[0]) {
      exituser[0].password = userinfo.password;
      exituser[0].issetuppassword = true;
      await exituser[0].save();
      return res.status(200).json({
        status: "email verifed ",
        // message: "Error while verifying user",
      });
    }
    console.log(userinfo);
    const user = {
      name: userinfo.name,
      password: userinfo.password,
      emailid: userinfo.emailid,
      team: userinfo.team,
    };
    const newuser = await userSchema.create(user);
    // await userinfo.remove();
    newuser.issetuppassword = true;
    await newuser.save();
    await welcomeemail({
      email: user.emailid,
      subject: "Welcome to Fulltoss",
      name: user.name,
    });
    return res.status(200).json({
      status: "email verifed ",
      // message: "Error while verifying user",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err,
      error: err,
    });
  }
};
exports.getuserinfo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const userinfo = await userSchema.findById(id);
    console.log(userinfo);
    if (!userinfo) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        userinfo: userinfo,
      },
      message: "User info available",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error while fetching user details",
      error: err,
    });
  }
};
exports.profile = async (req, res) => {
  const { name, phoneno, about } = req.body;
  console.log(req.body);
  try {
    let user = await userSchema.findByIdAndUpdate(req.body._id, {
      ...req.body,
      phoneno: phoneno,
      about: about,
      name: name,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await userSchema.findById(req.body._id);
    console.log(user);
    res.status(200).json({
      status: "success",
      message: "User profile updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
exports.userlogin = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.emailid) {
      return res.status(400).json({
        message: "Please enter your email address",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        message: "Please enter your password",
      });
    }
    const user1 = await userSchema.find({ emailid: req.body.emailid });
    if (!user1) {
      return res.status(404).json({
        message: "Your account does not exist",
      });
    }
    console.log(user1[0].password);
    const user = await userSchema
      .findOne({ emailid: req.body.emailid })
      .select("+password");
    if (!user) {
      return res.status(404).json({
        message: "Your account does not exist",
      });
    }
    const validuser = await bcrypt.compare(req.body.password, user.password);
    if (!validuser) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    return auth.createSendToken(user, 201, res);
  } catch (err) {
    console.log(req.body);
    return res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};
