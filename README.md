# 🚀 Employee Registration System — AWS

A real-world **Employee Registration System** built using **AWS EC2, Amazon S3, Amazon DynamoDB, IAM, Node.js, Express.js, HTML, CSS, and JavaScript**.

The application allows users to submit their personal and professional information, upload a profile photo and resume, store uploaded files in **Amazon S3**, and store registration details in **Amazon DynamoDB**.

---

## 🏗️ Architecture

```text
                         🌐 Internet
                              |
                              ▼
                    ┌─────────────────┐
                    │      User       │
                    │    Browser      │
                    └────────┬────────┘
                             |
                             ▼
                    ┌─────────────────┐
                    │      EC2        │
                    │   Node.js API   │
                    │    Express      │
                    └────────┬────────┘
                             |
                  ┌──────────┴──────────┐
                  ▼                     ▼
          ┌──────────────┐      ┌──────────────┐
          │     S3       │      │  DynamoDB    │
          │              │      │              │
          │ Profile Photo│      │ Employee     │
          │ Resume       │      │ Details      │
          │              │      │              │
          └──────────────┘      └──────────────┘
```

---

## ✨ Features

* 👤 Employee registration
* 📧 Email validation
* 📱 Mobile number validation
* 💼 Job position selection
* 🎓 Education details
* 🏠 Address information
* 📷 Profile photo upload
* 📄 Resume upload
* ☁️ Files stored in Amazon S3
* 🗄️ Registration data stored in DynamoDB
* 🔐 IAM Role based AWS access
* 📱 Responsive design
* ⚡ Node.js + Express backend
* 🎨 Modern HTML/CSS frontend

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* Multer

### AWS

* Amazon EC2
* Amazon S3
* Amazon DynamoDB
* AWS IAM

### AWS SDK

* `@aws-sdk/client-s3`
* `@aws-sdk/client-dynamodb`
* `@aws-sdk/lib-dynamodb`

---

# 📁 Project Structure

```text
employee-registration/
│
├── server.js
├── package.json
├── package-lock.json
│
└── public/
    └── index.html
    |__  script.js


```

---

# 🔄 Application Workflow

```text
User opens website
        ↓
Employee Registration Form
        ↓
Enter personal information
        ↓
Upload profile photo
        ↓
Upload resume
        ↓
Submit application
        ↓
EC2 Node.js Backend
        ↓
       Multer
        ↓
 ┌──────┴───────┐
 ↓              ↓
S3          DynamoDB
 ↓              ↓
Photo       Employee
Resume      Information
```

---

# ☁️ AWS Services

## 1. Amazon EC2

EC2 hosts the Node.js application.

Example:

```text
EC2
 ├── Node.js
 ├── Express
 └── Employee Registration Application
```

---

## 2. Amazon S3

S3 stores uploaded files.

```text
S3 Bucket
│
├── profile-photos/
│   ├── APP-10001-photo.jpg
│   └── APP-10002-photo.jpg
│
└── resumes/
    ├── APP-10001-resume.pdf
    └── APP-10002-resume.pdf
```

---

## 3. Amazon DynamoDB

DynamoDB stores employee registration information.

Example record:

```json
{
  "applicationId": "APP-10001",
  "fullName": "Rahul Patil",
  "email": "rahul@gmail.com",
  "mobile": "9876543210",
  "position": "Cloud Engineer",
  "education": "B.Tech",
  "experience": "Fresher",
  "address": "Pune, Maharashtra",
  "profilePhotoKey": "profile-photos/APP-10001-photo.jpg",
  "resumeKey": "resumes/APP-10001-resume.pdf",
  "createdAt": "2026-08-18T10:30:00Z"
}
```

---

# 🔐 IAM Security

The EC2 instance uses an **IAM Role** to access S3 and DynamoDB.

```text
EC2
 │
 ▼
IAM Role
 │
 ├── S3 Permission
 │
 └── DynamoDB Permission
```

### Important

Do **not** put AWS credentials directly inside the application:

```text
❌ AWS_ACCESS_KEY_ID
❌ AWS_SECRET_ACCESS_KEY
```

Use an EC2 IAM Role instead.

---

# 🚀 Installation

## Step 1 — Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-registration.git
```

Go inside the project:

```bash
cd employee-registration
```

---

# Step 2 — Install Dependencies

```bash
npm install
```

Required packages:

```bash
npm install express multer @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

---

# Step 3 — Configure AWS

Use your AWS region:

```javascript
const AWS_REGION = "ap-south-1";
```

Set your S3 bucket:

```javascript
const S3_BUCKET =
    "YOUR_BUCKET_NAME";
```

DynamoDB table:

```javascript
const DYNAMODB_TABLE =
    "EmployeeApplications";
```

---

# Step 4 — Create DynamoDB Table

Create a DynamoDB table:

```text
Table Name:
EmployeeApplications
```

Partition Key:

```text
applicationId
```

Type:

```text
String
```

---

# Step 5 — Create S3 Bucket

Create an S3 bucket:

```text
employee-registration-files-YOURNAME
```

Keep the bucket private.

Create folders:

```text
profile-photos/
resumes/
```

---

# Step 6 — Create IAM Role

Create an IAM Role for EC2.

Example:

```text
EC2-Employee-Registration-Role
```

Give it permission to:

```text
S3
DynamoDB
```

Attach the role to your EC2 instance.

---

# Step 7 — Launch EC2

Recommended for learning:

```text
AMI:
Amazon Linux 2023

Instance:
t2.micro / t3.micro

Port:
3000
```

Security Group:

```text
SSH
22

Custom TCP
3000
```

---

# Step 8 — Connect to EC2

```bash
ssh -i your-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

---

# Step 9 — Install Node.js

```bash
sudo dnf update -y
```

```bash
sudo dnf install nodejs npm -y
```

Check versions:

```bash
node -v
```

```bash
npm -v
```

---

# Step 10 — Start Application

```bash
npm start
```

Or:

```bash
node server.js
```

Expected output:

```text
Server running on port 3000
```

Open:

```text
http://YOUR_EC2_PUBLIC_IP:3000
```

---

# 📊 Database Design

## DynamoDB

| Attribute       | Description           |
| --------------- | --------------------- |
| applicationId   | Unique application ID |
| fullName        | Employee name         |
| email           | Email address         |
| mobile          | Mobile number         |
| dob             | Date of birth         |
| gender          | Gender                |
| position        | Job position          |
| education       | Qualification         |
| experience      | Experience            |
| address         | Address               |
| profilePhotoKey | S3 photo path         |
| resumeKey       | S3 resume path        |
| createdAt       | Registration time     |

---

# 📦 S3 Object Structure

```text
employee-registration-bucket/
│
├── profile-photos/
│   ├── APP-10001-photo.jpg
│   └── APP-10002-photo.jpg
│
└── resumes/
    ├── APP-10001-resume.pdf
    └── APP-10002-resume.pdf
```

---

# 🧪 Testing

Test the registration form with:

```text
Name:
Rahul Patil

Email:
rahul@gmail.com

Mobile:
9876543210

Position:
Cloud Engineer

Education:
B.Tech

Experience:
Fresher

Address:
Pune, Maharashtra
```

Upload:

```text
Profile Photo → photo.jpg
Resume → resume.pdf
```

After submission:

```text
S3
 ↓
Photo + Resume

DynamoDB
 ↓
Employee Information
```

---

# 🔍 Verify S3

Go to:

```text
AWS Console
   ↓
S3
   ↓
Your Bucket
```

Check:

```text
profile-photos/
resumes/
```

---

# 🔍 Verify DynamoDB

Go to:

```text
AWS Console
   ↓
DynamoDB
   ↓
EmployeeApplications
   ↓
Explore table items
```

You should see the employee registration data.

---

# ⚙️ Run Application with PM2

Install PM2:

```bash
sudo npm install -g pm2
```

Start application:

```bash
pm2 start server.js --name employee-registration
```

Check:

```bash
pm2 status
```

View logs:

```bash
pm2 logs employee-registration
```

Save:

```bash
pm2 save
```

---

# 🔒 Security Best Practices

* Use IAM Roles instead of hardcoded AWS credentials.
* Keep the S3 bucket private.
* Validate uploaded file types.
* Limit upload file size.
* Use HTTPS in production.
* Use Nginx as a reverse proxy.
* Don't expose unnecessary EC2 ports.
* Use environment variables for application configuration.
* Use least-privilege IAM policies.

---

# 🚀 Future Improvements

Possible upgrades:

* 🔑 Admin login
* 👨‍💼 Admin dashboard
* 📋 View all applications
* 🔎 Search employees
* ✏️ Update employee details
* 🗑️ Delete applications
* 📥 Download resume
* 🖼️ View profile photo
* 📧 Email confirmation
* 🌐 Custom domain
* 🔒 HTTPS with SSL
* ⚖️ Application Load Balancer
* 📈 CloudWatch monitoring
* 🔄 CI/CD with GitHub Actions

---

# 🎯 Learning Outcomes

After completing this project, you will understand:

```text
EC2
 ↓
IAM Role
 ↓
Node.js
 ↓
Express.js
 ↓
S3
 ↓
DynamoDB
 ↓
Security Groups
 ↓
PM2
```

This project demonstrates how to build and deploy a **real-world AWS cloud application** using multiple AWS services.

---
##OUTPUT##
<img width="1366" height="768" alt="{53C67E9F-D6DD-490E-8053-49A887EAB833}" src="https://github.com/user-attachments/assets/19270564-66dd-448b-81b7-be8f54207ee2" />

<img width="1366" height="768" alt="{93EEDEFC-E626-4A10-8D47-26DB887CC27A}" src="https://github.com/user-attachments/assets/42950850-a9b7-41b0-96c0-bca04f6e1428" />

<img width="1366" height="768" alt="{CA61462B-9F7C-4302-8FB1-68C64C35DFFB}" src="https://github.com/user-attachments/assets/4a97215b-e831-403e-811f-72b1cbade165" />

<img width="1366" height="768" alt="{489EF96A-A219-470D-8327-DE201E3BE63F}" src="https://github.com/user-attachments/assets/97ae5ffa-7963-4651-8f84-0ec9f54e50ce" />

<img width="1366" height="768" alt="{EB04F7B6-6BBE-4ABC-9A54-C88DFC98CDF7}" src="https://github.com/user-attachments/assets/793fc041-92c1-44ee-9d3f-b87335ea843c" />

<img width="1366" height="768" alt="{DF5B78ED-03B4-4860-B5D2-50A927295764}" src="https://github.com/user-attachments/assets/faf8f35f-c114-4357-9ddb-e4ad25aa1aac" />

<img width="1366" height="768" alt="{B66E140D-85BC-4121-9826-71C02415A002}" src="https://github.com/user-attachments/assets/5ff12a5b-0d28-4e91-b69f-41878898f960" />




# 👨‍💻 Author

**ASWAD GORIVALE**

Cloud / DevOps Learner

Skills:

```text
AWS
EC2
S3
DynamoDB
IAM
Docker
Linux
Git
GitHub
Node.js
```

---

# ⭐ If you found this project useful

Give this repository a ⭐ on GitHub!

```text
AWS EC2 + S3 + DynamoDB
Employee Registration System
```
