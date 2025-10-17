# 📝 To-Do List Application  

A simple and functional **MERN Stack** task management app that allows users to **add, edit, mark complete, and delete tasks** with authentication.

---

## 🚀 Project Overview  

This project is divided into two main parts:
- **Frontend (Next.js + Tailwind + Reactstrap)**  
- **Backend (Node.js + Express + MongoDB)**  

---

## ⚙️ Backend Setup  

### 📂 Navigate to Backend Folder  
```bash
    
    cd server

```
### 📦 Install Dependencies

```bash

    npm install

```

### 🔑 Environment Variables
Create a file named .env inside your backend folder and add the following:
```env

   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

```
### 🏃 Start the Server
```bash

   node --watch index.js

```
The --watch flag automatically restarts the server when files change.

### ✅ Verify Server

Once the server is running, you should see:
```bash

   Server is running on port 5000
   MongoDB connected successfully

```

## 💻 Frontend Setup
### 📂 Navigate to Frontend Folder
```bash

   cd client

```
### Create a .env file and add the following:
```env

   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

```
### 📦 Install Dependencies
```bash

   npm install

```
### 🧠 Start the App
```bash

   npm run dev

```
⚠️ Make sure your backend server is running before starting the frontend.

## 🧩 Features

### ➕ Add new tasks

### 🖊️ Edit existing tasks

### ✅ Mark tasks as complete

### ❌ Delete tasks

### 🔒 Auth-protected routes (requires JWT token)

### 💾 MongoDB data persistence

## 🖼️ UI Details

1) Each task is displayed in a card layout

2) Completed tasks are highlighted with a green border

3) Pending tasks have a subtle gray border

4) Smooth form validations using Formik + Yup

5) Toast notifications powered by Sonner

## 🧾 Scripts

Command	Description

```bash
npm install	#Install dependencies
npm run dev	#Start the frontend (development mode)
node --watch index.js	#Start the backend with live reload
```

📬 Contact

Author: Dhanashri
Email: nambiardhanashri@gmail.com

GitHub: DigitNexus

🧡 Made with MERN Stack & caffeine ☕️