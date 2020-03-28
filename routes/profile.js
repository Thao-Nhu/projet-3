const express = require('express');
const router  = express.Router();
const User = require("../models/User");

router.get('/yourprofile/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    User.findById(req.params.id).populate('bookings')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.json(err);
        })
})

module.exports = router;