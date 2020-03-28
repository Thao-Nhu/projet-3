const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bookingSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    start_date: Date,
    end_date:Date,
    stay_comment:String,
    specific_request:String,
    booking_status:{
      type:String,
      enum: ['booked','booking-confirmed', 'guest-arrived', 'guest-departed']
    },
    payment_status:{
        type:String,
        enum: ['paid','not-paid']
      }
}, {
   timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;