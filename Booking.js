let fs = require("fs");
var Book = require("./Booking.json");
var Room = require('./Room.json')

Booking = (cid, rid, di, du, qty) => {
    Book.push({
    id: parseInt(Book.length + 1),
    CustomerID: cid,
    RoomID: rid,
    DateCheckIN: di,
    DateCheckOUT: du,
    Quantity: qty
  });
  Savefile()
};
Savefile = () =>{
    fs.writeFile('Booking.json', JSON.stringify(Book), function(err) {
        if(err) throw err;
    });
}
// console.log(Book)
// console.log(d)
module.exports = {
  Booking: Booking,
};