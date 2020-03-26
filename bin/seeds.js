// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Moment = require("moment");
//const User = require("../models/User");
const Room = require('../models/Room')

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/ln-bb-server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

/*let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})*/

var enumerateDaysBetweenDates = function(startDate, endDate) {
  var dates = [];
  var currDate = Moment(startDate).startOf('day');
  var lastDate = Moment(endDate).startOf('day');
  while(currDate.add(1, 'days').diff(lastDate) < 0) {
      //console.log(currDate.toDate());
      dates.push(currDate.clone().toDate());
  }
  return dates;
};
const s=new Date("2020-03-26");
const e=new Date("2021-03-26");

var dateArr = enumerateDaysBetweenDates(s,e).map(date=>new Date(date.toISOString().split('T')[0]));

const room={
  book_Ids: [],
  available_Dates: dateArr,
}

Room.create(room, (err) => { // on n'utilise pas de promesse mais une fonction call back error first
if (err) { throw(err) }
console.log(`Created ${room} room`);

// Once created, close the DB connection
mongoose.connection.close();
});