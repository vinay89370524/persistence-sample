# persistence-sample

This is a sample service that accepts data over a REST API and persists/retrieves it using MongoDB.

## BUILD & USAGE

The nodejs service runs by default on port 80. To overwrite for local usage, set the env var

### The Following Environment Variables Must Be Set
* **MONGO_DB_CONNECTION_STRING** - A valid mongodb URI pointing at a running MongoDB instance. Example: mongodb://192.168.1.100:27017/sample
* [OPTIONAL] **PORT** - A valid port number to run the service on.  Defaults to 80.

### Building & Running Locally
Requires the following:
Node 10+, MongoDB 4.x

from src dir (where package.json exists), Run the following:
```
npm run build

export MONGO_DB_CONNECTION_STRING=mongodb://SOME_MONGO:27017/sample 
export PORT=8123

npm start
```

### Building & Running Using Docker

From the root dir (where the Dockerfile exists), Run the following:

```
docker build -t persistence-sample .

docker run -it -p 8080:80 -e MONGO_DB_CONNECTION_STRING=mongodb://SOME_MONGO:27017/sample persistence-sample
```

### Using The Service

Please refer to the [postman collection](./docs/Persistence&#32;Sample.postman_collection.json) in the docs folder for quick start.

#### ROUTES:

**[GET] /** -> Health Check
<br>
**[GET] /api/v1/data** -> Get the currently persisted data
<br>
**[POST] /api/v1/data** -> Persist data.  The content-type header must be set to "application/json".  The request body, if a valid JSON object will be persisted.
