const express = require("express");
const multer = require("multer");
const crypto = require("crypto");

const {
    S3Client,
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const {
    DynamoDBClient
} = require("@aws-sdk/client-dynamodb");

const {
    DynamoDBDocumentClient,
    PutCommand
} = require("@aws-sdk/lib-dynamodb");

const path = require("path");

const app = express();

const PORT = 3000;

const AWS_REGION = "ap-south-1";

const S3_BUCKET =
    "YOUR_BUCKET_NAME";

const DYNAMODB_TABLE =
    "EmployeeApplications";


/* =========================
   AWS S3
========================= */

const s3 = new S3Client({
    region: AWS_REGION
});


/* =========================
   DynamoDB
========================= */

const dynamoClient = new DynamoDBClient({
    region: AWS_REGION
});

const dynamoDB =
    DynamoDBDocumentClient.from(dynamoClient);


/* =========================
   Multer
========================= */

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


/* =========================
   Middleware
========================= */

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(
    path.join(__dirname, "public")
));


/* =========================
   Registration API
========================= */

app.post(
    "/register",

    upload.fields([
        {
            name: "profilePhoto",
            maxCount: 1
        },
        {
            name: "resume",
            maxCount: 1
        }
    ]),

    async (req, res) => {

        try {

            console.log("Registration request received");

            const {
                fullName,
                email,
                mobile,
                dob,
                gender,
                position,
                education,
                experience,
                address
            } = req.body;


            /* =========================
               Validation
            ========================= */

            if (
                !fullName ||
                !email ||
                !mobile ||
                !position ||
                !education
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Please fill all required fields."
                });

            }


            if (
                !req.files ||
                !req.files.profilePhoto ||
                !req.files.resume
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Profile photo and resume are required."
                });

            }


            /* =========================
               Application ID
            ========================= */

            const applicationId =
                "APP-" +
                Date.now() +
                "-" +
                crypto
                    .randomBytes(3)
                    .toString("hex")
                    .toUpperCase();


            /* =========================
               Files
            ========================= */

            const profilePhoto =
                req.files.profilePhoto[0];

            const resume =
                req.files.resume[0];


            /* =========================
               S3 File Names
            ========================= */

            const photoKey =
                `profile-photos/${applicationId}-${profilePhoto.originalname}`;

            const resumeKey =
                `resumes/${applicationId}-${resume.originalname}`;


            /* =========================
               Upload Profile Photo
            ========================= */

            await s3.send(
                new PutObjectCommand({

                    Bucket: S3_BUCKET,

                    Key: photoKey,

                    Body: profilePhoto.buffer,

                    ContentType:
                        profilePhoto.mimetype

                })
            );


            /* =========================
               Upload Resume
            ========================= */

            await s3.send(
                new PutObjectCommand({

                    Bucket: S3_BUCKET,

                    Key: resumeKey,

                    Body: resume.buffer,

                    ContentType:
                        resume.mimetype

                })
            );


            /* =========================
               DynamoDB
            ========================= */

            const item = {

                applicationId,

                fullName,

                email,

                mobile,

                dob: dob || "",

                gender: gender || "",

                position,

                education,

                experience:
                    experience || "",

                address:
                    address || "",

                profilePhotoKey:
                    photoKey,

                resumeKey:
                    resumeKey,

                createdAt:
                    new Date().toISOString()

            };


            await dynamoDB.send(
                new PutCommand({

                    TableName:
                        DYNAMODB_TABLE,

                    Item: item

                })
            );


            /* =========================
               Success
            ========================= */

            res.json({

                success: true,

                message:
                    "Application submitted successfully!",

                applicationId

            });

        }

        catch (error) {

            console.error(
                "ERROR:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Application submission failed."

            });

        }

    }
);


/* =========================
   Server
========================= */

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);
