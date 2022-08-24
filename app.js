const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const sharp = require('sharp');
const piexif = require("piexifjs");

const { query, IMAGES_TABLE } = require('./db');
const { extractCoordinates, deserialiseImageRow } = require('./utils');
const { response } = require('express');



const THUMBNAILS_PATH = 'thumbnails/'
const IMAGES_PATH = 'images/'

let port = process.env.PORT || 4000;

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static/images', express.static(path.join(__dirname, 'images')))
app.use('/static/thumbnails', express.static(path.join(__dirname, 'thumbnails')))

// handle storage using multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IMAGES_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${Math.round(Math.random() * 1E9)}.jpeg`);
    }
});
let upload = multer({ storage: storage });

// POST /images
app.post('/images', upload.single('image'), async (req, res, next) => {
    // TODO: file storage and db write should be done in transactional manner
    const file = req.file;
    if (!file) {
        return res.status(400).send({message: 'Please upload an image.'});
    }

    // generate and store thumbnail
    let thumbPath = THUMBNAILS_PATH + file.filename
    let imagePath = IMAGES_PATH + file.filename
    await sharp(file.path).resize(250, 250).toFile(thumbPath)

    // extract lat and lng
    let jpeg = await fs.readFile(file.path);
    let data = jpeg.toString("binary");
    let loadedData = piexif.load(data)
    let gps = loadedData["GPS"]
    let {lat, lng} = extractCoordinates(gps)
    
    let insertImageSQL = `INSERT INTO ${IMAGES_TABLE} (img_path, thumb_path, lat, lng)
    VALUES ($1, $2, $3, $4);`
    await query(insertImageSQL, [imagePath, thumbPath, lat, lng])

    return res.status(201).send({ message: 'Image uploaded successfully.'});
});
// GET /images
app.get('/images', async (req, res, next) => {
    let {maxLng, minLng, maxLat, minLat } = req.query
    
    sqlQuery = `SELECT id, img_path, thumb_path, lng, lat
    FROM ${IMAGES_TABLE}
    WHERE lat BETWEEN $1 AND $2
    AND lng BETWEEN $3 AND $4;
    `
    data = await query(
        sqlQuery,
        [minLat, maxLat, minLng, maxLng]
    )

    let response = data.rows.map(deserialiseImageRow)

    return res.status(200).json(response)
})
app.listen(port, () => {
    console.log('Server started on: ' + port);
});