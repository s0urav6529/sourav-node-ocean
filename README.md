# nodejs documentaion

### Open a new node project on vs-code:

At first create a git repository in github. Then copy the SSH configuration and go to the main terminal...

    git clone <ssh git repository link>

    cd <git repository name>

    code .

##### Now, go to vs-code terminal and initialize the project...

    npm init →then give the info as instruction

##### Install required external pakage 📦

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

##### For uninstall a npm package 📦

    npm uninstall package-name

##### Go to pakage.json and change this script part

    "scripts": {
        "start": "NODE_ENV=development nodemon app.js", or
        "start": "nodemon app.js",
        "prod": "NODE_ENV=production node app.js",
        "test": "mocha test/integration/fileRoutes.test.js",
    },

### Blue print of index.js file

    //@external module
    const express = require("express");
    const dotenv = require("dotenv").config();
    const morgan = require("morgan");
    const cors = require("cors");
    const path = require("path");
    const bodyParser = require("body-parser");
    const app = express();

    const databaseConnection = require("./configuration/databaseConnection");

    //@connect the database
    databaseConnection();

    //@useful middleware
    app
        .use(cors())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({extended : true }));

    if(process.env.NODE_ENV === "development"){
        app.use(morgan("dev"));
    }

    //@set static route
    app.use(express.static(path.join(__dirname,"public")));

    app
        .use("/", xRoute)
        ...
        ...

    //@start the server
    app.listen(process.env.PORT,() => {
        console.log(`App listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
    })

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

### customized http success & error handle

##### utilities/responseHandle.js file

    //@error response
    const errorResponse = function(error, res) {

        const errorMessage = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: "Gateway Timeout",
        }[error.code] || error.message;

        res.json({status : error.code, error : errorMessage});
    };

    //@success response
    const successResponse = function(code , message, data, res) {
        const success = {
            message : message,
            data : data
        }

        res.status(code).json({success : success.message, data : success.data});
    };

    //@throw a new created message
    const newError = function(code) {
        const error = new Error("");
        error.code = code;
        return error;
    }

    //@exports
    module.exports = {  errorResponse,
                        successResponse,
                        newError
                    }

##### invoke the functions from the controller

    const xController = async(req,res) => {

    try {
            const xData = new adminModel({
                data....
            });

            if(xData) {

                await xData.save();

                successResponse(200,"New x added successfully !",xData,res);
            }else{
                throw newError(404);
            }

        } catch (error) {
            //@customize the error
            if(error.code === 11000){
                error.message = "Email already exist !"
            }
            errorResponse(error,res);
        }
    };

### bcrypt

It return a promise thus we need to use await. Bcrypt.hash() is hashed any password for protection & also compare the given password with hashed password during the login authentication or any occasion.

##### Password hashing

    const hashedPassword = await bcrypt.hash(password, 10);

##### Compare input password of the user with the hashed password of the database

    if (await bcrypt.compare(password, user.password)) {/...}

Here 'password' is input password & 'user.password' is hashed password
