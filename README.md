# nodejs documentaion

### Open a new node project on vs-code:

At first create a git repository in github. Then copy the SSH configuration and go to the main terminal...

    git clone <ssh git repository link>

    cd <git repository name>

    code .

##### Now, go to vs-code terminal and initialize the project...

    npm init →then give the info as instruction

##### Install required external module

    npm install dotenv [for environment setup]
    express
    nodemon
    body-parser [for parsing object,json & other unreadable file]
    http-errors [for error-handling]
    cookie-parser [for cookie]
    jsonwebtoken [for creating json]
    express-async-handler [for error handling]
    mongoose [for database]
    bcryptjs [for hashing]
    moment [Moment module is used for parsing, validating, manipulating, and displaying dates and times in JavaScript]
    ejs [for ejs template]
    express-validator [for validating result]
    multer [for file upload]
    socket.io [for real time communication]
    express-session [for create login session]
    nodemailer [for sending mail in case of forget password]
    randomstring [use as a token in case of forget password etc]
    socket.io [for install web socket]
    morgan [HTTP request logger]
    @faker-js/faker [for fake date generate]
    @aws-sdk/client-s3
    aws-sdk
    multer-s3
    nodemailer [for mail]
    randomstring
    sslcommerz-lts
    twilio

##### Go to pakage.json and change this script part

    "scripts": {
        "start": "NODE_ENV=development nodemon app.js", or
        "start": "nodemon app.js",
        "prod": "NODE_ENV=production node app.js",
        "test": "mocha test/integration/fileRoutes.test.js",
    },

##### For uninstall a npm package 📦

    npm uninstall package-name

##### For run project

    npm start

##### Create .env file paste this code (To access this file data use process.env.PORT/APP...etc)

    PORT=5000
    NODE_ENV = development
    APP_NAME=
    MONGO_CONNECTION_STRING=mongodb://localhost/<databasename>
    MONGOURI=mongodb+srv://Foodline:<password>@cluster0.szpnieh.mongodb.net/<databasename>?retryWrites=true&w=majority [for mongo atlas]
    COOKIE_SECRET=from the below (Cookie secret link)
    JWT_ACCESS_TOKEN_SECRET=from the below (jwt link)
    JWT_EXPIRY=86400000  // as your choice in milisecond
    COOKIE_NAME= anything
    APP_URL=http://localhost:portno

### 🍪 COOKIE SECRET 🔗

    https://api.wordpress.org/secret-key/1.1/salt/

take one key from the above 🔗 & go below 🔗 to genarate hash key...

    https://emn178.github.io/online-tools/sha1.html

### JWT ACCESS TOKEN SECRET 🔗

    https://www.javainuse.com/jwtgenerator
