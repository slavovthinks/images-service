const fs = require('fs').promises
const path = require('path')
const { IMAGES_TABLE, query } = require('./db')

let initImagesSQL = `CREATE TABLE ${IMAGES_TABLE} (
    id  SERIAL PRIMARY KEY,
    img_path TEXT,
    thumb_path TEXT,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL
);`

Promise.all(
    [
        fs.mkdir(path.join(__dirname, 'images')),
        fs.mkdir(path.join(__dirname, 'thumbnails')),
        query(initImagesSQL)
    ]
).then(() => {
    console.log("[√] Project setup succesful.")
}
).catch(e => {
    // TODO: Add cleanup on error
    console.error("[!] ERROR:")
    console.error(`An error occured during project setup: ${e}`)
})