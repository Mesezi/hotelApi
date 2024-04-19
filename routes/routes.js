const express = require("express");
const router = express.Router();
const RoomModel = require("../models/roomModels");
const {  registerValidation, loginValidation} = require("../middleware/authvalidation.middleware")
const { login, register, userProfile} = require("../controller/auth.controller")
const verifyToken = require("../middleware/auth.middleware") 


router.post("/register", registerValidation, register);

//Login route with register validation
router.post("/login", loginValidation, login);

//Profile route with register validation
router.get("/profile/:id", verifyToken, userProfile);

//all users route with 
router.get("/users", verifyToken);

router.post("/rooms", verifyToken , async function (req, res) {
  const details = { ...req.body };
  // res.send("add a room");
  if (details.adults < 1) {
    res
      .status(400)
      .json({ message: "Adults in a room can not be less than 1 " });
  }

  const data = new RoomModel({ ...details });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }


});

router.patch("/rooms/:id", function (req, res) {
  res.send(req.params.id);
});

router.delete("/rooms/:id", function (req, res) {
  res.send("delete a room");
});

router.get("/rooms", function (req, res) {
  res.send("Get all rooms");
});

router.get("/rooms/:id", function (req, res) {
  res.send("Get all rooms under category");
});

module.exports = router;
