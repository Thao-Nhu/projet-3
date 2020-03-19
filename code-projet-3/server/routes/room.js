const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.post("/availability-request", (req, res, next) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    console.log("startDate", startDate);
    console.log("endDate", endDate)

    Room.find()
    .then(room=> {
        //console.log("room",room[0].available_Dates)
        console.log(
            room[0].available_Dates.filter(date=>new Date(date)>=new Date(startDate)&& new Date(date)<=new Date(endDate))
        )
    })
    .catch(err => console.log(err))
  });

module.exports = router;