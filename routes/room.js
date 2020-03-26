const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Moment = require("moment");

router.post("/availability-request", (req, res, next) => {
    const startDate = req.body.startDate.split("T")[0];
    const endDate = req.body.endDate.split("T")[0];
    //console.log("startDate", Moment(req.body.startDate));
    //console.log("endDate", Moment(req.body.endDate))

    Room.find()
    .then(rooms=> {
        console.log("availabilty dates",rooms[0].available_Dates.filter(date=>new Date(date)>=new Date(startDate)&& new Date(date)<=new Date(endDate)))
        res.json({available_Dates:
            rooms[0].available_Dates.filter(date=>{
                //console.log(new Date(date),new Date(endDate),new Date(date)<=new Date(endDate))
                return date>=new Date(startDate)&& date<=new Date(endDate)
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

router.get('/availability-display', (req, res, next) => {
    Room.find()
    .then(rooms=>res.json({available_Dates:rooms[0].available_Dates}))
    .catch(err=>console.log(err))
});

module.exports = router;