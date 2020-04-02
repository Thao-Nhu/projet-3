const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const mongoose = require('mongoose');

router.get('/yourprofile/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    //console.log(req.params.id)
    User.findById(req.params.id).populate('bookings')
        .then(response => {
            res.status(200).json(response);
            console.log("response",response)
        })
        .catch(err => {
            res.json(err);
        })
})

module.exports = router;