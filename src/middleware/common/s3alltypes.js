const multer = require('multer');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

const app = express();

// Configure AWS SDK with your credentials and region
const awsConfig = {
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
};
const s3Client = new S3Client(awsConfig);

// Create a multer instance for handling file uploads with streaming to S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read', // Access control for the uploaded file
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const key = file.originalname;
      cb(null, key);
    },
  }),
});

app.post('/single', upload.single('file'), (req, res) => {
  try {
    // Access the S3 URL of the uploaded file

    console.log('File uploaded to S3:', req.file.location);

    res.send("file uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/mulitple', upload.array('files',3), (req, res) => {
  try {
    // Access the S3 URL of the uploaded file

    req.files.map((file)=>{
            console.log('File uploaded to S3:', file.location);
    });
    res.send("file uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/multipart', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), (req, res) => {
  try {

    console.log(req.files['avatar']);
    console.log(req.files['gallery']);
    res.status(200).send("file uploaded successfully");

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


const deleteFile = async(key, res) => {

  try {
    console.log(key)
    const deleteParams = {
      Bucket : 'idolgroup-hrm-all-file-store',
      Key : key,
    };
    const command = new DeleteObjectCommand(deleteParams);
    const data = await s3Client.send(command);
    console.log("file deleted : ", data);
    res.status(200).json({ data });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

app.delete("/delete",(req,res)=>{
    deleteFile("https://x.s3.x.x.com/x.jpeg",res)
});
