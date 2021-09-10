var http = require("http");
var url = require("url");
var fs = require("fs");
const { CheckDetail, ShowAllRoom } = require("./Room");
const { EditProfile } = require("./Customer");
const { Booking } = require('./Booking')
http
  .createServer(function (req, res) {
    var data = url.parse(req.url, true);
    var request_path = url.parse(req.url, true);
    var message = "";
    var status = 200;
    var data = "";
    switch (request_path.pathname) {
      case "/ShowAllRoom":
        try {
          let tx = ShowAllRoom();
          message += `มีห้องเลข = ${tx[0]} จำนวน = ${tx[1]} ห้อง`;
          data = tx;
          console.log(`มีห้องเลข = ${tx[0]} จำนวน = ${tx[1]} ห้อง`);
        } catch (err) {
          status = 400;
          message += err;
          console.log(err);
        }
        break;
      case "/CheckDetail":
        try {
          let tx = CheckDetail(request_path.query.Type);
          message += `ห้องประเภท  ${request_path.query.Type} ประกอบด้วย  ${tx} `;
          data = tx;
          console.log(
            `ห้องประเภท  ${request_path.query.Type} ประกอบด้วย ${tx} `
          );
        } catch (err) {
          status = 400;
          message += err;
          console.log(err);
        }
        break;
      case "/EditProfile":
        try {
          let tx = EditProfile(
            request_path.query.id,
            request_path.query.Name,
            request_path.query.Address,
            request_path.query.Tel
          );
          message += `Edit id${request_path.query.id} Sucess`;
          data = tx;
          console.log(`Edit id${request_path.query.id} Sucess`);
        } catch (err) {
          status = 400;
          message += err;
          console.log(err);
        }
        break;
      case "/CreateAccount":
        try {
          let tx = CreateAccount(
            request_path.query.Name,
            request_path.query.Address,
            request_path.query.Tel
          );
          message += `CreateAccount Sucess Your id is ${tx}`;
          data = tx;
          console.log(`CreateAccount Sucess Your id is ${tx}`);
        } catch (err) {
          status = 400;
          message += err;
          console.log(err);
        }
        break;
      case "/Booking":
        try {
          DcI=request_path.query.DateCheckIN
          let datin = DcI.split('-')
          DcO=request_path.query.DateCheckOUT
          let datout = DcO.split('-')
          cid=request_path.query.CustomerID
          rid=request_path.query.RoomID
          qty=Quantity
          Booking(cid,rid,datin,datout,qty)
        } catch (err) {
          status = 400;
          message += err;
          console.log(err);
        }
        break;
      default:
        status = 404;
        message = " Not Found ";
        break;
    }
    let access_log = new Date().toISOString() + `${request_path.path}\n`;

    fs.appendFile("access.log", access_log, (err) => {
      if (err) {
        throw err;
        console.log(err);
      }
    });
    let response_obj = {
      status: status,
      message: message,
      data: data,
    };

    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response_obj));
  })
  .listen(8080);
console.log("Server running on port 8080.");
