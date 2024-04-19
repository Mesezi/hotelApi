const express = require("express");
//Importing the JWT package
const jwt = require("jsonwebtoken");
//Importing the bcrypt package
const bcrypt = require("bcryptjs");
//Imprtong the user model
const userModel = require("../models/userModel");
//Importing the express-async-handler package
const asyncHandler = require("express-async-handler");
//Importing the uuidv4 package to generate userId
const { v4: uuidv4 } = require("uuid");

const register = asyncHandler(async (req, res) => {
  //Destructuing the inputs from req.body
  const { fullName, email, password, phoneNumber, userType } = req.body;

  //Verifying the email address inputed is not used already
  const verifyEmail = await userModel.findOne({ email: email });
  try {
    if (verifyEmail) {
      return res.status(403).json({
        message: "Email already used",
      });
    } else {
      //generating userId
      try {
        const userId = uuidv4();
        //using bcrypt to hash the password sent from the user
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword)
        const user = await new userModel({
          userId: userId,
          fullName: fullName,
          email: email,
          password: hashPassword,
          phoneNumber: phoneNumber,
          userType: userType
        });
        const savedUser = await user.save();

        if (savedUser) {
            console.log('here')
          return res.status(201).json({
            message: "user successfully created!",
            result: savedUser,
            success: true,
          });
        }

      } catch (err) {
        res.status(500).json({
          error: err,
        });
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  //Destructing the inputs from req.body
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email: email,
    });

    console.log(user)

    if (!user) {
      //if user does not exist responding Authentication Failed
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log(checkPassword)
    console.log(process.env.JWT_SECRET)
    
    if (!checkPassword) {
      return res.status(401).json({
        message: "Authentication Failed",
      });
    } else {
      let jwtToken = jwt.sign(
        {
          email: user.email,
          userId: user.userId,
        },
        //Signign the token with the JWT_SECRET in the .env
       
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        accessToken: jwtToken,

        //I like to send the userId of the user that loggedin in order to fetch his data and dispaly
        userId: user.userId,
      });
    }
  } catch (err) {
    return res.status(401).json({
      messgae: err.message,
      success: false,
    });
  }
});

const userProfile = asyncHandler(async (req, res, next) => {
  //Destructing id from the req.params
  const { id } = req.params;

  try {
    //verifying if the user exist in the database
    const verifyUser = await userModel.findOne({ userId: id });
    if (!verifyUser) {
      return res.status(403).json({
        message: "user not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        messgae: `user ${verifyUser.fullName}`,
        success: true,
      });
    }
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
});

// const users = asyncHandler(async (req, res) => {
//   //Fetching all users from database
//   try {
//     const users = await userModel.find();
//     console.log(users);
//     return res.status(200).json({
//       data: users,
//       sucess: true,
//       message: "users list",
//     });
//   } catch (error) {
//     return res.status(401).json({
//       sucess: false,
//       message: error.message,
//     });
//   }
// });

module.exports = {
  register,
  login,
  userProfile,
};
