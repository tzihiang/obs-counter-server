const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

const FILE_PATH_1 = 'value1.txt';
const FILE_PATH_2 = 'value2.txt';

app.use(bodyParser.json());

// Add your origin URLs here. This includes the IPv4 of the machine that is hosting the UI server and its respective port
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

const readValue = (filePath) => {
    return parseInt(fs.readFileSync(filePath, 'utf8').trim());
};

const writeValue = (filePath, value) => {
    fs.writeFileSync(filePath, value.toString());
};

app.get('/value1', (req, res) => {
    const value = readValue(FILE_PATH_1);
    res.json({ value });
});

app.post('/value1', (req, res) => {
    const action = req.body.action;
    let value = readValue(FILE_PATH_1);
    if (action === 'increment') {
        value += 1;
    } else if (action === 'decrement') {
        value -= 1;
    }

    writeValue(FILE_PATH_1, value);
    res.json({ value });
});

app.get('/value2', (req, res) => {
    const value = readValue(FILE_PATH_2);
    res.json({ value });
});

app.post('/value2', (req, res) => {
    const action = req.body.action;
    let value = readValue(FILE_PATH_2);
    if (action === 'increment') {
        value += 1;
    }
    else if (action === 'decrement') {
        value -= 1;
    }

    writeValue(FILE_PATH_2, value);
    res.json({ value });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});