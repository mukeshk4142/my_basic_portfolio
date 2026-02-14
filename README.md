# Professional Portfolio with Admin Dashboard (Firebase Edition)

A dynamic, responsive personal portfolio website built with React, Vite, and Tailwind CSS. This application features a comprehensive Admin Dashboard managed via **Firebase** for real-time data persistence and authentication.

## 🚀 Features

### Public Interface
*   **Modern UI/UX**: Glassmorphism design, smooth scrolling, and custom animations.
*   **Resume-Style Portfolio**: Dedicated page displaying experience, education, skills, and certifications in a professional layout.
*   **Dynamic Content**: All text, images, skills, and projects can be updated from the admin panel without touching code.
*   **Contact Form**: Visitors can send messages that are saved directly to your database.
*   **Trusted Companies**: Scrolling marquee of previous clients/employers.

### Admin Dashboard (Protected)
*   **Secure Authentication**: Email/Password login powered by **Firebase Auth**.
*   **Portfolio Management**: Full CRUD (Create, Read, Update, Delete) control over your profile, skills, education, and experience.
*   **HR Management System**: Track interview records with fields for candidate details, status, and dates.
*   **Inbox**: View and delete messages received from the contact form.
*   **Cloud Storage**: All data is stored in **Firebase Firestore**, ensuring it syncs across devices and users.

## 🛠️ Tech Stack

*   **Frontend**: React (TypeScript), Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Routing**: React Router DOM
*   **Backend / Database**: Firebase (Authentication & Firestore)

## ⚙️ Setup Guide

### 1. Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn
*   A Google Account (for Firebase)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd project-folder
npm install
```

### 3. Firebase Configuration (Crucial Step)
Since this project uses Firebase, you must connect it to your own Firebase project.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **Add project** and follow the prompts.
3.  **Register App**:
    *   Click the **Web** icon (`</>`) to register a new app.
    *   Copy the `firebaseConfig` object provided.
4.  **Configure Code**:
    *   Open `src/firebase.ts` in your code editor.
    *   Replace the placeholder values with your actual API keys.

```typescript
// src/firebase.ts
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5.  **Enable Authentication**:
    *   In Firebase Console, go to **Build** > **Authentication**.
    *   Click **Get Started**.
    *   Select **Email/Password** and enable it.
    *   **Create Admin User**: Go to the **Users** tab and click "Add user". Enter an email (e.g., `admin@example.com`) and a password. You will use this to log in.

6.  **Create Database**:
    *   Go to **Build** > **Firestore Database**.
    *   Click **Create Database**.
    *   Choose a location close to you.
    *   **Rules**: Start in **Test Mode** for development, or configure rules to allow read/write.

### 4. Running Locally
Start the development server:

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment

This project is optimized for deployment on platforms like Vercel or Netlify.

### Deploying to Vercel (Recommended)
1.  Push your code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3.  Import your GitHub repository.
4.  Vercel will detect Vite. Click **Deploy**.
5.  **Note**: Ensure your `src/firebase.ts` has the correct keys before pushing, or use Environment Variables for better security.

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (Navbar, Modal, etc.)
├── context/         # Global State (AuthContext, PortfolioContext)
├── pages/           # Page views (Home, Portfolio, Login, Dashboard)
├── firebase.ts      # Firebase configuration file
├── App.tsx          # Main routing logic
└── main.tsx         # Entry point
```

## 🔐 Default Login
There is no default login in the code anymore. You must create a user in your **Firebase Console -> Authentication -> Users** tab. Use those credentials to log in at `/login`.
