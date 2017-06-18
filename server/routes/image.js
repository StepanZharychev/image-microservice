const express = require('express');
const router = express.Router();
const fs = require('fs');

const nano = require('nanomsg');
const socket = nano.socket('bus');

socket.bind('tcp://127.0.0.1:3000');

socket.on('data', (data) => {
    let action = JSON.parse(String(data));
    if (action.type === 'server') {
        imgUploadResponse.json({
            name: action.name,
            preview: action.preview
        });
    }
});

let imgUploadResponse;
router
    .post('/images/upload', (req, res) => {
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            let bufs = [];
            imgUploadResponse = res;

            file.on('data', function (chunk) {
                bufs.push(chunk);
            });
            file.on('end', function () {
                const fbuf = Buffer.concat(bufs);
                const base64 = fbuf.toString('base64');

                socket.send(JSON.stringify({
                    type: 'img',
                    action: 'save',
                    data: base64,
                    name: filename
                }));
            });
        });
    });

module.exports = router;