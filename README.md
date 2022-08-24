# Images service
A solution to the assignment: [ASSIGNMENT.md](ASSIGNMENT.md)

## Project prerequesites:
The project was developed with the following versions:
- Node version - v16.17.0 LTS
- npm version - 8.5.5
- Postgres - 14.5
- optional Docker & Docker-compose

## Project Setup:
1. Run `docker-compose up` or have a PG service running
2. Create a database in postgres. Default app database name is `images_service`.
3. Look at `db.js` file config defaults. If necessairy override them with ENV variables
4. Run `npm run setup`. For script details check `setup.js` file.
5. Run `npm start`. This will run the service on port `4000` the default port can be changed using `PORT` ENV variable

## API Endpoints:
 __There is an exported Postman collection: `images-service.postman_collection.json` in the root of the project__

|Endpoint|Description|Params/Fields|
|-------|-------|----|
|POST `/images`|Endpoint for uploading images. Accepts Content-Type: `multipart/form-data;`|`image` - jpeg file form field|
|GET `/images`|Endpoint for querying images by geographical bounding box| `maxLng, minLng, maxLat, minLat` - float type bounding box params|

## Optimisations:
- Index on lng, lat columns
- Validate input file is a jpeg
- Use ORM for db data validation, increised security, better file path handling(serializing/deserializing)
- Pagination on get endpoint
- The approach taken for serving static file seems odd, moving images and thumbnails into a static folder could be a better approach
- Unit tests are a must
- The codebase, controllers in particular should be split in smaller testable functions
- Introduce a gitignored config file that could be overriden by env vars as another way of configuration
- There is no authentication and authorization

## Scaling the service:
- Substitude block storage with object storage like AWS S3 to enable horizontal scaling
- Depending on scenarios and environment I can come up with other possible solutions in a Live chat