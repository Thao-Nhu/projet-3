const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const User = require("../models/User");
//const Moment = require("moment");

router.post('/', (req, res, next)=>{
    console.log("req.body.startDate",req.body.startDate)
    Booking.create({
        start_date: req.body.startDate,
        end_date: req.body.endDate,  
        specific_request: req.body.specificRequest,
        stay_comment: req.body.stayComment,
        user_id: req.body.userID,
        price: req.body.totalPrice,
        booking_status:"booking-under-confirmation",
        payment_status:"not-paid"
    })
      .then(response => {
          //console.log("response",response)
          //console.log("req.body.userID",req.body.userID)
          //console.log("user",User.findById(req.body.userID))
          res.json(response)
          User.findByIdAndUpdate(req.body.userID, { $push:{ bookings: response._id } })
          .then(theResponse => {
              //console.log(theResponse);
          })
          .catch(err => {
            res.json(err);})
      })
      .catch(err => {
        res.json(err);
      })
})

router.post("/availability-request", (req, res, next) => {
    const startDate = req.body.startDate.split("T")[0];
    const endDate = req.body.endDate.split("T")[0];
    //console.log("startDate", Moment(req.body.startDate));
    //console.log("endDate", Moment(req.body.endDate))

    Room.find()
    .then(rooms=> {
        //console.log("availabilty dates",rooms[0].available_Dates.filter(date=>new Date(date)>=new Date(startDate)&& new Date(date)<=new Date(endDate)))
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

/*router.get('/availability-display', (req, res, next) => {
    Room.find()
    .then(rooms=>res.json({available_Dates:rooms[0].available_Dates}))
    .catch(err=>console.log(err))
});*/

module.exports = router;