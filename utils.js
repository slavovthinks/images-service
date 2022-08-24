const piexif = require("piexifjs")

const fileFields = ['img_path', 'thumb_path']

function deserialiseImageRow(row) {
    let deserialisedRow = {...row}
    fileFields.forEach(field => {
        deserialisedRow[field] = `/static/${deserialisedRow[field]}`
    })
    return deserialisedRow
}

function extractCoordinates(gps) {
    const latitude = gps[piexif.GPSIFD.GPSLatitude];
    const latitudeRef = gps[piexif.GPSIFD.GPSLatitudeRef];
    const longitude = gps[piexif.GPSIFD.GPSLongitude];
    const longitudeRef = gps[piexif.GPSIFD.GPSLongitudeRef];
    const latitudeMultiplier = latitudeRef == 'N' ? 1 : -1;
    const decimalLatitude = latitudeMultiplier * piexif.GPSHelper.dmsRationalToDeg(latitude);
    const longitudeMultiplier = longitudeRef == 'E' ? 1 : -1;
    const decimalLongitude = longitudeMultiplier * piexif.GPSHelper.dmsRationalToDeg(longitude);

    return {
        lng: decimalLongitude,
        lat: decimalLatitude
    }
}

module.exports = {
    extractCoordinates,
    deserialiseImageRow
}