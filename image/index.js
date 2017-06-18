const express = require('express')
const app = express();
const path = require('path');

const nano = require('nanomsg');
const socket = nano.socket('bus');
const imgLoader = require('./controls/loader')

socket.connect('tcp://127.0.0.1:3000');

socket.on('data', function (data) {
    let action = JSON.parse(String(data));
    if (action.type === 'img') {
        const fullName = `${(new Date()).toISOString()}-${action.name}`;
        const previewFile = `${(new Date()).toISOString()}-preview-${action.name}`;

        socket.send(JSON.stringify({
            type: 'server',
            name: `http://127.0.0.1:8001/${fullName}`,
            preview: `http://127.0.0.1:8001/${previewFile}`
        }));

        imgLoader.load(action.data, fullName, previewFile);
    }
});

app.use(express.static(path.join(__dirname, './imgs')));
app.listen(8001);
