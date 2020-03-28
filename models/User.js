const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {type:String},
  phonenumber: String,
  password:String,
  bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
