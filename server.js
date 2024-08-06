const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const lifeValueDir = path.join(__dirname, "lifeCOunts");
const localIpAddress = getLocalIpAddress();

// Add your origin URLs here. This includes the IPv4 of the machine that is hosting the UI server and its respective port
const allowedOrigins = [
  "http://localhost:3000",
  `http://${localIpAddress}:3000`,
];
console.log(allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const readValue = (filePath) => {
  return parseInt(fs.readFileSync(filePath, "utf8").trim());
};

const writeValue = (filePath, value) => {
  fs.writeFileSync(filePath, value.toString());
};

app.get("/life/:id", (req, res) => {
  const filePath = path.join(lifeValueDir, `value${req.params.id}.txt`);
  const currValue = readValue(filePath);
  res.send({ value: currValue });
});

app.post("/life/:id", (req, res) => {
  const filePath = path.join(lifeValueDir, `value${req.params.id}.txt`);
  const newValue = req.body.value;
  writeValue(filePath, newValue);
  res.send(`Value Updated to ${newValue}`);
});

app.get("/api/ip", (req, res) => {
  fs.readFile(path.join(__dirname, "ip_address.txt"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.send(data.trim());
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`IP Address of system: ${localIpAddress}`);
});
