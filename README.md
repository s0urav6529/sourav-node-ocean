# nodejs documentaions

### Open a new node project on vs-code:

At first create a git repository in github. Then copy the SSH configuration and go to the main terminal...

    git clone <ssh git repository link>

    cd <git repository name>

    code .

##### Now, go to vs-code terminal and initialize the project...

    npm init →then give the info as instruction

That will create a json package...

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

##### Force installation of any pakage 📦 after clone a git

    npm i --force

##### For uninstall a npm package 📦

    npm uninstall package-name

##### Go to pakage.json and change this script part

    "scripts": {
        "start": "NODE_ENV=development nodemon app.js", or
        "start": "nodemon app.js",
        "prod": "NODE_ENV=Dataion node app.js",
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

    const hashedPassword = async(password) => {

        try {
            return await bcrypt.hash(password,10);
        } catch (error) {
            return error;
        }
    }

##### Compare input password of the user with the hashed password of the database

    const verifyPassword = async(inputPassword,hashPassword) => {
        try {
            return await bcrypt.compare(inputPassword,hashPassword);
        } catch (error) {
            return error;
        }
    }

Here 'password' is input password & 'user.password' is hashed password

### validator

    https://www.npmjs.com/package//validator

###### [for any input validation check] middleware/validationHandler.js

    //@external module
    const { body , validationResult } = require("express-validator");
    const validator = require("validator");
    const { errorResponse } = require("../utilities/responserHandler");

    //@check during registration
    const registrationValidation = [

        body("email" , "Invalid Email").isEmail(),
        body("password", "Minimum length of 5 characters required").isLength({ min : 5 }),
        body("phone").custom((value) => {
            if(!validator.isMobilePhone(value, ["bn-BD"])){
                throw new Error("Invalid phone number");
            }
            return true
        }),

    ];

    //@check during login
    const loginValidation = [

        body("email" , "Invalid Email").isEmail(),

    ];

    const validate = async(req, res, next) => {

        try {

            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({ errors : errors.array() });
            }else{
                next();
            }

        } catch (error) {
            errorResponse(error, res);
        }

    };

    //@exports
    module.exports = {  registrationValidation,
                        loginValidation,
                        validate
                    }

###### [for role base access ]

During user login set a token in the res header for checking the role of that user.

    const userLogin = async(req, res) => {

        try{

            ...............

            const userPayload = {
                data : {
                    id : userData._id,
                    role : userData.role
                }
            }

            const token = createAuthToken(userPayload);

            const authToken = {
                id : userData.id,
                email : userData.email,
                role : userData.role,
                token
            }

            res.status(200).json(authToken);

        }catch(error){
            return error;
        }
    }

###### middleware/routeValidator.js

    const isLogin = async(req, res, next) => {

        try {

            //@get the authToken from Bearer Token
            let authToken = req.get('Authorization');

            if(authToken){

                authToken = authToken.split(' ')[1];

                authToken = functions.verifyAuthToken(authToken);

                if(authToken){

                    req.account = authToken.data;
                    next();
                }
            }
            else{
                throw responseHandler.newError(400);
            }

        } catch (error) {
            return res.status(400).json({Error:error.message,message:"Invalid Permission"});
        }
    }

    const requiredRole = function( roleArray ){

        try {

            return function(req, res, next){

                if(req.account && roleArray.includes(req.account.role)){
                    next();
                }else{
                    return res.status(400).json({message:"Invalid Permission !"});
                }
            }
        } catch (error) {
            return res.status(400).json({Error:error.message,message:"Invalid Permission"});
        }
    }

### RegExp for search box

##### N.B

^: Asserts the start of the string.

$: Asserts the end of the string.

"i": Specifies a case-insensitive match.

##### search Route

    DataRoute.route("/searchData/:item").get(searchData);

    //url -> http://localhost:8000/Data/searchData/<item>

Make a special charecter escape function in utilities folder and named as escape.

##### utilities/functions.js

    const escapeString = function(str){
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    //exports
    module.exports = { escapeString };

##### controller for this search

    const { escapeString } = require("../utilities/functions.js")

    const searchData = async(req, res)=>{

        try {

            const searchQuery = new RegExp( escapeString(req.params.item), "i");
            const price = new RegExp("^" + escapeString(req.params.item), "i");

            let data ;

            //now search this expession from the database
            if(req.params.item !== ""){

                data = await model.find({
                    $or:[{
                        category: searchQuery
                    },{
                        subCategory: searchQuery
                    },{
                        dataName: searchQuery
                    },{
                        price: price
                    },{
                        description: searchQuery
                    }]
                });
            }

            successResponse(200,`${data.length} data's found !`,data,res);

        } catch (error) {
            errorResponse(error, res);
        }
    }

### Filter controller

    api : http://localhost:4000/product/all

    url : http://localhost:4000/product/all?slug=&minPrice=&maxPrice=&from=&to=&page=&limit=

code below...

    const getProduct = async(req,res) => {

        try {

            const { slug , minPrice, maxPrice, from, to, sort } = req.query;

            const queryObject = {};

            if(slug){
                queryObject.slug = slug;
            }

            if(minPrice || maxPrice){

                queryObject.price = {};

                if(minPrice && !isNaN(parseInt(minPrice))){
                    queryObject.price.$gte = parseInt(minPrice);
                }
                if(maxPrice && !isNaN(parseInt(maxPrice))){
                    queryObject.price.$lte = parseInt(maxPrice);
                }
            }

            if(from){

                const startDate = formatDate(from);

                if(startDate){

                    let date = new Date(startDate);
                    date.setHours(0,0,0,0);
                    queryObject.updatedAt = { $gte: date };
                }
            }

            if(to){

                const endDate = formatDate(to);

                if(endDate){

                    let date = new Date(endDate);
                    date.setHours(0,0,0,0);
                    date.setDate(date.getDate() + 1);

                    if (queryObject.updatedAt) {

                        queryObject.updatedAt.$lt = date;

                    } else {

                        queryObject.updatedAt = { $lt: date };

                    }
                }
            }


            //@get the productObject for sorting
            let productData = productModel.find(queryObject).
                                populate({path:'categoryId subCategoryId' , select:'category subCategory'});


            //@default sort by selling count
            let sortBy = "-sell";
            if(sort){
                sortBy = sort.replace(","," ");
            }

            productData = productData.sort(sortBy);

            //@apply pagination
            productData = await pagination(req.query.page,req.query.limit,productData);

            successResponse(200,`${productData.length} product found !`,productData,res);

        } catch (error) {
            errorResponse(error,res);
        }
    }

### pagination

    const pagination = async (pageNo, pageLimit, data)=>{

        try {

            const page = parseInt(pageNo) || 1;
            const limit = parseInt(pageLimit) || 20;
            const skip = (page - 1) * limit;

            return await data.skip(skip).limit(limit);

        } catch (error) {
            return error;
        }
    }

### Format Date

##### Suppose, 'sDate' is a const variable need to change the format.

    const startDate = formatDate(sDate);

##### formateDate funtion is below.

    const moment = require("moment");

    const formatDate = function(date){

        const parseDate = moment(date,'DD-MM-YYYY',true);

        if(parseDate.isValid()){
            return parseDate.format('YYYY-MM-DD');
        }
        else {
            console.log("Invalid date format !");
            return;
        }
    }

### slug generator

##### type-1

    const generateSlug = (fullName) => {
        return fullName.toLowerCase().replace(/\s+/g, "-");
    };

##### type-1

    const generateSlug = (s1, s2) => {

        let slug = `${s1}%${s2}`;
        let time = Date.now();

        slug = `${slug}%${time}`;

        return slug.replace(/\s+/g, "-");

    }

### AWS - s3

##### s3- View in AWS

![Screenshot from 2024-01-31 11-28-29](https://github.com/s0urav6529/softcopy-note/assets/96060029/f76a3102-d50f-4a80-b491-f6f77147dfae)

##### How to access public files form s3

![Screenshot from 2024-01-31 11-35-17](https://github.com/s0urav6529/softcopy-note/assets/96060029/bd397dee-b962-48c1-a673-c9d99e1b6021)

Here, 'piyusgargdev-yt' is the bucket name and 's3.ap-south-1.amazonaws.com' is the service name & rest is the files name or key.

##### How to access private files form s3

![Screenshot from 2024-01-31 11-47-39](https://github.com/s0urav6529/softcopy-note/assets/96060029/a5147e9e-384d-44a2-bb7b-0b4dd2fb8137)

This will not work because there is no presigned URL for access, so we need token & singiture to access.

So, need to make an account on s3 & get access token so that private files can be accessed. Suppose we have an user named 'John' & create an access token of this user so whenever this user tries to access files then s3 checkes if this token is valid for access files , if yes then ok otherwise it will denied again.

![Screenshot from 2024-01-31 11-53-13](https://github.com/s0urav6529/softcopy-note/assets/96060029/576555c7-e956-40d5-bf9d-0f04783b78f7)

There are two types of presigned URL (GET & PUT object)

##### s3 image upload using multer & multer-s3

First of all install below pakage

    npm install @aws-sdk/client-s3 multer-s3

##### middlewares/s3Handler.js

    //@external module
    const { S3Client } = require('@aws-sdk/client-s3');
    const multerS3 = require('multer-s3');
    const path = require("path");

    //@configure AWS SDK with your credentials and region
    const awsConfig = {
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        },
    };

    //@create s3 client instance
    const s3Client = new S3Client(awsConfig);

    //@create storage configuration
    const storageConfig = multerS3({
        s3: s3Client,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
                const fileExtention = path.extname(file.originalname);

                //@make unique filename
                const key = file.originalname.replace(fileExtention,"").split(" ").join("-")+ "-" + Date.now() + fileExtention;
            cb(null, key);
        },
    });

    //@exports
    module.exports = { storageConfig };

##### upload code for any route

    const { storageConfig } = require("../")

    const upload = multer({
        storage : storageConfig
    });

for single file upload in one field

    router.route("/").post(upload.single('file'),(req,res) => {

        //@uploaded file url in database
        res.send(req.file.location);
    });

req.file below:

![Screenshot from 2024-04-02 12-28-47](https://github.com/smartfieldservice/hrm-server/assets/96060029/92777230-4ae7-4dd7-9b9e-a56cb2c935d8)

for multiple file upload in one field

    router.route("/").post(upload.array('files',3),(req,res) => {

        //@uploaded file url in database
        req.files.map((file)=>{
            console.log('File uploaded to S3:', file.location);
        });
    });

req.files below:

![Screenshot from 2024-04-04 12-44-39](https://github.com/s0urav6529/sourav-node-ocan/assets/96060029/9ebfa2e2-aabd-48bd-b176-ac85c5649acf)

practical use of "req.files" that save in database

    const createDocument = async( req, res) => {

        try {

            const { title, description, owner }= req.body;

            //@create an array of file locations
            const allFiles = req.files.map((file) => {
                return file.location;
            })

            console.log(req.files)

            const newDocument = new Document({
                title ,
                filesName : allFiles,
                description ,
                owner ,
                slug : generateSlug(title)
            });

            await newDocument.save();

            res.status(200).json({ message : "New document added successfully !", data : newDocument });

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

for multipart file upload in various field

    const uploadMultiple = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'document', maxCount: 8 }]);

    app.post('/multipart', uploadMultiple, (req, res) => {
        try {

            console.log(req.files['photo']);
            console.log(req.files['document']);
            res.status(200).send("file uploaded successfully");

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

### Random Id generator

For cryptographic or security-related tasks, Node.js provides the crypto module which includes more robust methods for generating random numbers. For security-sensitive applications, use the crypto module.

    const crypto = require('crypto');
    let randomBytes = crypto.randomBytes(3).toString('hex');
    console.log(randomBytes);

![Screenshot from 2024-05-13 12-03-36](https://github.com/s0urav6529/sourav-node-ocan/assets/96060029/d9fc44f7-7c2b-43de-a6cd-b85532c85c73)

### mongoose

##### Mongo server:

starts cmd:

    sudo systemctl start mongod

status check cmd:

    systemctl status mongod

##### aggregate

Type-1

    const searchQuery = new RegExp( escapeString(req.params.clue), "i");

    const leaves = await Leave.aggregate([
            {
                $lookup: {
                    from: "concerns",
                    localField: "concernId",
                    foreignField: "_id",
                    as: "concern"
                }
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "departmentId",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $match: {
                    $or: [
                        { 'concern.name': searchQuery },
                        { 'department.name': searchQuery },
                        { 'user.name': searchQuery },
                        { leavetype: searchQuery },
                    ]
                }
            }
        ]);

Type-2

    const { ObjectId } = require('mongodb');

    leaves = await Leave.aggregate([
            {
                $lookup: {
                    from: "departments",
                    localField: "departmentId",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $match: {
                    $and: [
                        { concernId : new ObjectId(concernId) },
                        {
                            $or: [
                                { 'department.name': searchQuery },
                                { 'user.name': searchQuery },
                                { leavetype: searchQuery }
                            ]
                        }
                    ]
                }
            }
        ]);

##### populate

Type - 1

    const searchAllProduct = async(req,res) => {

        try {

            //@just load all data from the database
            //@here in populate (In path (categoryId & subCategoryId) is the key to relation with the category, subCategory model
            //@and in select (category & subCategory) is the property of category & subCategory Model)

            const allData = await productModel.find({}).select('productName').
                            populate({path:'categoryId subCategoryId' , select:'category subCategory'});

            if(allData.length > 0){
                res.status(200).json({allData,message:"All data loaded successfully !"});
            }
            else{
                res.status(200).json({message:"No data found !"});
            }

        } catch (error) {
            res.status(400).json({error,message:"Errors occur during search all products !"});
        }
    }

Type - 2

    const userInformation = asyncHandler(async(req, res) => {

        try{

            let user = User.findById({ _id : req.query.id }).
                        populate({ path : 'concernId departmentId', select : ['name', 'name']});

            if(!user){
                res.status(404).json({ message: "Not found" });
            }else{

                //@details of the user
                user = await user;

                res.status(200).json({ message: "User found", data : user });
            }

        }catch (error) {
            res.status(400).json({ message: error.message });
        }

    });

##### Create a virtual 'id' instead of '\_id'

Suppose we have a Schema name 'userSchema'...

    userSchema.virtual('id').get(function(){
        return this._id.toHexString();
    });
    userSchema.set('toJSON',{
        virtuals:true,
    });

##### create() condition wise

    const addLeaveToEmployee = await TotalLeaveOfUser.create({
        employeeId,
        totalSick: leavetype === 'sick' ? totaldays : 0,
        totalCasual: leavetype === 'casual' ? totaldays : 0
    });

##### findByIdAndUpdate() Function

The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback.

    const updateDocument = async (id) => {
    try {
            const updatedResult = await User.findByIdAndUpdate(
                { _id: id },
                {
                    profession: "Backend Developer",
                },
                {
                    new : true
                }
            );
            console.log(updatedResult);
        } catch (error) {
            console.log(error);
        }
    };

##### findOneAndUpdate() Function

    const subCategoryData = await subCategoryModel.findOneAndUpdate(
        { categoryId : req.params.id },
        { category : categoryData.category},
        { new:true}
    );

@increment using condition

    const addLeaveToEmployee = await TotalLeaveOfUser.findOneAndUpdate({
            employeeId
        },{
            $inc: {
                totalSick: leavetype === 'sick' ? totaldays : 0,
                totalCasual: leavetype === 'casual' ? totaldays : 0
            }
        },{
            new : true
    });

##### updateMany() Function

    await subCategoryModel.updateMany(
        { categoryId : req.params.id },
        { category : categoryData.category},
        { new:true}
    );

##### For delete any object from the array. You should use the 'update' method with the '$pull' operator to remove the specific element from the array.

    const result = await Order.updateOne(
        { 'orderDetails.orderId': orderId },
        { $pull: { 'orderDetails': { 'orderId': orderId } } }
    );

    if (result.matchedCount > 0) {
        //successful deletation
    } else {
        //error
    }

### Use Redis in node

    https://redis.io/docs/connect/clients/nodejs/

To install node-redis, run:

    npm install redis

Configure code

    const { createClient } = require("redis");
    const redisClient = createClient();

    redisClient.on('error', err => console.log('Redis Client Error', err));
    redisClient.connect();
