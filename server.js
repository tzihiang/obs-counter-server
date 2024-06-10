const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const FILE_PATH_1 = 'value1.txt';
const FILE_PATH_2 = 'value2.txt';

app.use(bodyParser.json());

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
    else if (action === 'reset') {
        value = 40;
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
    else if (action === 'reset') {
        value = 40;
    }

    writeValue(FILE_PATH_2, value);
    res.json({ value });
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Server is running on port 5000');
});
