Job Portal System

A full-stack Job Portal System built with Next.js (frontend) and Node.js + Express + MongoDB (backend). The system provides functionality for Applicants (job seekers), Employers, and Admins.

Deployed on:

Frontend (Next.js): Vercel

Backend (Node.js/Express): Render

🚀 Features
👨‍💼 Applicant Features

Register/Login with secure authentication

Update profile (skills, CV, etc.)

Browse job listings by category and filters

Apply to jobs directly from the portal

Track application status

Manage favorite jobs

🏢 Employer Features

Register/Login with secure authentication

Post new jobs with detailed descriptions

Manage job listings (edit, delete, close)

View applicants for their jobs

Accept or reject job applications

🔑 Admin Features

Manage all users (employers and applicants)

Manage job postings across the platform

Monitor application statistics

Secure access to Admin Dashboard (protected routes)

🛠️ Tech Stack
Frontend

Next.js 15
(App Router, SSR)

React & React Hooks

TypeScript

Tailwind CSS for styling

Axios for API calls

Backend

Node.js + Express.js

MongoDB + Mongoose ODM

JWT Authentication

Bcrypt for password hashing

CORS & Helmet for security

Deployment

Frontend: Vercel

Backend: Render

⚙️ Installation & Setup

1. Clone the Repository

2. Install Dependencies
   Backend
   cd server
   npm install

Frontend
cd client
npm install

3. Configure Environment Variables
   Backend .env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Run the Project Locally
   Backend
   cd server
   npm run dev

Frontend
cd client
npm run dev

Now visit https://talent-hub-orcin.vercel.app
🎉

🚀 Deployment
Frontend (Next.js on Vercel)

Push your repo to GitHub

Go to Vercel
→ New Project

Import your frontend repo (client/)

Add environment variables (NEXT_PUBLIC_API_URL)

Deploy 🚀

Backend (Node.js on Render)

Go to Render
→ New Web Service

Connect your repo (server/)

Add environment variables (MONGO_URI, JWT_SECRET, etc.)

Set Build Command:

npm install

Start Command:

npm run start

Deploy 🚀

📂 Project Structure
job-portal/
│
├── client/ # Next.js frontend
│ ├── app/ # App Router pages
│ ├── components/ # Reusable UI components
│ ├── public/ # Static assets
│ └── ...  
│
├── server/ # Node.js backend
│ ├── src/
│ │ ├── controllers/ # Request controllers
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # Express routes
│ │ ├── middleware/ # Auth middlewares
│ │ └── server.ts # Entry point
│ └── ...
│
└── README.md

🧑‍💻 Employer Flow

Register/Login as Employer

Post a Job

Manage Jobs (edit, delete, close)

View Applicants and approve/reject applications

👨‍🎓 Applicant Flow

Register/Login as Applicant

Browse Jobs

Apply for Jobs

Track application status

Save jobs to favorites

🔒 Authentication

JSON Web Token (JWT) used for session management

Protected routes for Employer and Admin dashboards

Secure password hashing with bcrypt
