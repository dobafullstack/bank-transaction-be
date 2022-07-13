const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

var accountSid = "AC17bc4654122bd09b233cfccb2d094eec"; // Your Account SID from www.twilio.com/console
var authToken = "e01babc1b5b0a58e9da381671a5dc9e7"; // Your Auth Token from www.twilio.com/console

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const app = express();

// var whitelist = [
//   "http://localhost:3000",
//   "https://bank-transaction-nine.vercel.app/",
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://bank-transaction-nine.vercel.app/");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.use(cors({ credentials: true, origin: true }));
// app.options("/sendSms", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

app.post("/sendSms", async (req, res) => {
  try {
    const response = await client.messages.create({
      body: req.body.body,
      from: "+15706724897",
      to: "+84944609933",
    });

    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

app.listen(4000, () => console.log("Server is running on PORT 4000"));
