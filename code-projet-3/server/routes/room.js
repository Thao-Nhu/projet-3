const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.post("/availability-request", (req, res, next) => {
    const startDate = req.body.startDate.split("T")[0];
    const endDate = req.body.endDate.split("T")[0];
    console.log("startDate", new Date(startDate));
    console.log("endDate", new Date(endDate))

    Room.find()
    .then(room=> {
        //console.log("availabilty dates",room[0].available_Dates.filter(date=>new Date(date)>=new Date(startDate)&& new Date(date)<=new Date(endDate)))
        res.json({available_Dates:
            room[0].available_Dates.filter(date=>{
                console.log(new Date(date),new Date(endDate),new Date(date)<=new Date(endDate))
                return new Date(date)>=new Date(startDate)&& new Date(date)<=new Date(endDate)
            })
        })
    })
    .catch(err => console.log(err))
    });
    /*Room.find({
        "available_Dates":{$elemMatch: {
            "gte":new Date(startDate),
            "lte":new Date(endDate)
        }}
    })
    .then(rooms=> {
        console.log("rooms",rooms)
        res.json({available_Dates:
            rooms[0].available_Dates
        })
    })
    .catch(err => console.log(err))
    });*/

module.exports = router;