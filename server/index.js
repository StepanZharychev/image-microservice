const express = require('express');
const app = express();
const path = require('path');
const busboy = require('connect-busboy');

app.use(express.static(path.join(__dirname, './static')));

const imageRoute = require('./routes/image');
app.use(busboy());
app.use('/api', imageRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(8000);