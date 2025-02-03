# Translense Backend Task

## Project Overview
This project is a **TypeScript-based** backend for a business registration and verification system. It utilizes **MongoDB** for data storage, **Express.js** for server handling, **Zod** for input validation, **Multer** for file uploads, **Resend** for email verification, and **Cloudinary** for image storage.

All APIs have been **successfully tested**, ensuring that verification emails are sent to the provided email addresses.

---

## Features
- **Business Registration API**
- **Email Verification API**
- **Proper Input Validations using Zod**
- **Secure File Upload Handling using Multer & Cloudinary**
- **Resend API for Email Verification**
- **Well-structured TypeScript Codebase**

---

## How to Set Up the Project
### 1. Clone the Repository
```sh
git clone ]https://github.com/udayasish/Translense-Backend-Task.git
cd Translense-Backend-Task
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Added All Environment Variables
A `.env` file has been provided with all necessary environment variables.


### 4. Start the Server
```sh
npm run start
```

The server will start running on `http://localhost:8000` (or the specified port in your environment variables).

---

## API Endpoints
### 1. **Create Business**
**Endpoint:** `POST /api/business/business`
- **Body (multipart/form-data):**
  ```json
  {
    "businessName": "Tech Solutionns Ltd.",
    "country": "Bharat",
    "state": "Assam",
    "city": "Guwahati",
    "address": "123 Markett St, SF",
    "openingTime": "06:00 AM",
    "closingTime": "04:00 PM",
    "email": "contact@techsol.com",  (eneter valid email for email generation)
    "mobile": "+1 415-555-1234",
    "file": (image file)
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Business created successfully",
    "data": { ... }
  }
  ```

### 2. **Verify Business**
**Endpoint:** `POST /api/business/verify`
- **Body (JSON):**
  ```json
  {
    "businessName": "Tech Solutionns Ltd.",
    "code": "123456"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Business verified successfully"
  }
  ```

---

## Technologies Used
- **TypeScript** - Strongly typed JavaScript
- **Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **Zod** - Input validation
- **Multer** - File uploads
- **Resend** - Email verification service
- **Cloudinary** - Image storage

---

## Task Details
This backend was developed as part of a **backend engineering task** with the following requirements:
- **Architect the database** using MongoDB.
- **Create all necessary APIs** to support business registration & verification.
- **Implement proper input validations** with Zod.
- **Follow best coding practices** with a clean, scalable codebase.

**All APIs have been tested successfully with emails sent to the provided addresses.**

---

