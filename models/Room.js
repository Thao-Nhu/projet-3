const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const roomSchema = new Schema({
  book_Ids: Array,
  available_Dates: Array,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
