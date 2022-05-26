const axios = require('axios');
const https = require('https');
var http = require('http');
var Stream = require('stream').Transform,
    fs = require('fs');


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function RandomSRC(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const download_image = (url, image_path) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
        new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(image_path))
                .on('finish', () => resolve())
                .on('error', e => reject(e));
        }),
    );


console.log('Downloadig some images...');

for (let i = 0; i < 10; i++) {


    https.get('https://this-person-does-not-exist.com/en?new=' + RandomSRC(1653596521790, 1653596621790), (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let test = JSON.parse(data);
            var ah = test['name'];
            console.log(ah);
            download_image('https://this-person-does-not-exist.com/img/' + ah, makeid(7) + ".png");
            sleep(10000);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}
