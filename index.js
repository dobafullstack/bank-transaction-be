const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

var accountSid = "AC17bc4654122bd09b233cfccb2d094eec"; // Your Account SID from www.twilio.com/console
var authToken = "e01babc1b5b0a58e9da381671a5dc9e7"; // Your Auth Token from www.twilio.com/console

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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