# 👔 ClosetIQ – AI Powered Smart Wardrobe Assistant

> An intelligent wardrobe management application that helps users organize clothing, build outfits, receive personalized AI-powered outfit recommendations, and plan outfits with ease.

![React Native](https://img.shields.io/badge/React%20Native-0.81-blue)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000000)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-blueviolet)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

# 📑 Table of Contents

- Overview
- Features
- Tech Stack
- Architecture
- Recommendation Engine
- Folder Structure
- Screenshots
- API Endpoints
- Database Overview
- Installation
- Environment Variables
- Demo
- Deployment
- Roadmap
- Contributing
- License
- Author

---

# 🚀 Overview

ClosetIQ is a full-stack React Native application that digitizes your wardrobe and delivers personalized outfit recommendations using a custom recommendation engine. Users can manage clothing, build outfits, schedule outfits, and receive AI-powered suggestions tailored to their wardrobe and preferences.

# ✨ Features

- 👕 Digital Closet
- 🤖 AI Outfit Recommendations
- 🎨 Outfit Builder
- 📅 Outfit Planner
- ☁️ Cloudinary Image Uploads
- 🔐 Firebase Authentication
- 📊 Closet Statistics
- 👤 Personalized Onboarding
- 📱 Cross-platform mobile app

# 🛠 Tech Stack

## Frontend
- React Native (Expo)
- React Navigation
- Context API
- Axios
- Reanimated

## Backend
- Node.js
- Express.js
- MongoDB + Mongoose

## Services
- Firebase Authentication
- Cloudinary
- JWT

# 🏗️ Architecture

```text
React Native App
       │
 REST API (Axios)
       │
Express Server
 ├── Auth
 ├── Closet
 ├── Planner
 ├── Outfits
 └── Recommendation Engine
       │
 ├── MongoDB
 └── Cloudinary
```

# 🧠 Recommendation Engine

```text
Wardrobe
   │
Candidate Generator
   │
Compatibility Scores
 ├── Color
 ├── Material
 ├── Style
 ├── Occasion
 └── Season
   │
Personalization
 ├── Favorite Colors
 ├── Preferred Style
 └── Preferred Fit
   │
Ranking
   │
Explanation Generator
   │
Recommendations
```

# 📂 Project Structure

```text
ClosetIQ/
├── Client/
│   ├── assets/
│   ├── src/
│   └── android/
└── Server/
    ├── controllers/
    ├── routes/
    ├── models/
    ├── services/
    └── recommendationEngine/
```

# 📸 Screenshots

Create a `screenshots/` folder:

```text
screenshots/
├── splash.png
├── login.png
├── home.png
├── closet.png
├── ai-suggestions.png
├── planner.png
├── profile.png
```

| Splash | Home |
|---|---|
| ![](screenshots/splash.png) | ![](screenshots/home.png) |

| Closet | AI Suggestions |
|---|---|
| ![](screenshots/closet.png) | ![](screenshots/ai-suggestions.png) |

# 🌐 REST API

## Authentication

| Method | Endpoint |
|---|---|
|POST|/api/auth/signup|
|POST|/api/auth/login|
|POST|/api/auth/google|

## Users

|Method|Endpoint|
|---|---|
|GET|/api/users/profile|
|PUT|/api/users/profile|

## Closet

|Method|Endpoint|
|---|---|
|GET|/api/items|
|POST|/api/items|
|PUT|/api/items/:id|
|DELETE|/api/items/:id|

## Outfits

|Method|Endpoint|
|---|---|
|GET|/api/outfits|
|POST|/api/outfits|

## Planner

|Method|Endpoint|
|---|---|
|GET|/api/planner|
|POST|/api/planner|

# 🗄️ Database Overview

- User
- Item
- Outfit
- Planner

Relationships:
- One User → Many Items
- One User → Many Outfits
- One User → Many Planner Entries

# ⚙️ Installation

```bash
git clone https://github.com/yourusername/ClosetIQ.git
cd ClosetIQ
```

## Client

```bash
cd Client
npm install
npx expo start
```

## Server

```bash
cd Server
npm install
npm run dev
```

# 🔐 Environment Variables

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
GEMINI_API_KEY=
```

# 🎥 Demo

Add your demo video:

```
https://youtu.be/YOUR_VIDEO_ID
```

# 🚀 Deployment

- Mobile App: Expo EAS
- Backend: Render/Railway
- Database: MongoDB Atlas
- Images: Cloudinary

# 🗺️ Roadmap

- Weather integration
- Laundry tracking
- Capsule wardrobe
- Fashion trends
- Shopping recommendations
- Social sharing

# 🤝 Contributing

Fork the repository, create a feature branch, commit your changes, and open a pull request.

# 📄 License

MIT License.

# 👨‍💻 Author

**Mohith Reddy**

- Full Stack Developer (MERN)
- React Native Developer
- B.Tech CSE (2026)

⭐ If you like this project, consider giving it a star!
