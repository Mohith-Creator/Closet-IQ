<h1 align="center">ClosetIQ – AI Powered Smart Wardrobe Assistant </h1>
<p align="center">
  <img src="screenshots/banner.png" alt="ClosetIQ Banner" width="100%">
</p>


<p align="center">
  <strong>Digitize your wardrobe. Create better outfits. Dress smarter with AI.</strong>
  <br><br>
  Organize your wardrobe • Build outfits • Get personalized AI recommendations • Plan your style effortlessly.
</p>

---

<!-- ===================== Key Features ===================== -->

<h3 align="center">✨ Key Features</h3>

<p align="center">
  👔 Digital Closet &nbsp;&nbsp;•&nbsp;&nbsp;
  🤖 AI Recommendations &nbsp;&nbsp;•&nbsp;&nbsp;
  🎨 Outfit Builder &nbsp;&nbsp;•&nbsp;&nbsp;
  📅 Outfit Planner &nbsp;&nbsp;•&nbsp;&nbsp;
  ☁️ Cloud Storage
</p>

---

<!-- ===================== Built With ===================== -->

<h3 align="center">🛠️ Built With</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
</p>

------

## 📑 Table of Contents

- 🚀 [Overview](#overview)
- ✨ [Features](#features)
- 🛠️ [Tech Stack](#tech-stack)
- 🏗️ [Architecture](#architecture)
  - 🧠 [Recommendation Engine](#recommendation-engine)
  - 📂 [Project Structure](#project-structure)
- 📸 [Screenshots](#screenshots)
- 🌐 [REST API](#api-endpoints)
  - 🗄️ [Database Overview](#database)
- ⚙️ [Installation](#installation)
  - 🔐 [Environment Variables](#environment-variables)
- 🎥 [Demo](#demo)
- 🚀 [Deployment](#deployment)
- 🗺️ [Roadmap](#roadmap)
- 🤝 [Contributing](#contributing)
- 📄 [License](#license)
- 👨‍💻 [Author](#author)

---
<a id="overview"></a>
# 🚀 Overview

ClosetIQ is a full-stack AI-powered wardrobe management application built with React Native, Node.js, Express.js, and MongoDB. It helps users digitize their wardrobe, organize clothing items, create custom outfits, and plan their daily style from a single mobile application.

At its core, ClosetIQ features a custom recommendation engine that analyzes wardrobe contents, personal preferences, colors, materials, occasions, seasons, and style compatibility to generate intelligent outfit suggestions. The application also includes secure authentication, cloud-based image storage, wardrobe analytics, and an intuitive outfit planner, providing a personalized and seamless fashion experience.

<a id="features"></a>
# ✨ Features

> 👔 **Digital Closet** — Organize and categorize your wardrobe with rich clothing metadata.

> 🤖 **AI Outfit Recommendations** — Get personalized outfit suggestions based on your wardrobe.

> 🎨 **Interactive Outfit Builder** — Create, preview, and save custom outfit combinations from your wardrobe.

> 📅 **Smart Outfit Planner** — Plan outfits for upcoming events using an integrated calendar.

> ☁️ **Cloud Image Management** — Store and retrieve clothing images securely with Cloudinary.

> 🔐 **Secure Authentication** — Firebase Authentication with protected REST APIs.

> 📊 **Wardrobe Analytics** — Visualize wardrobe insights and clothing statistics.

> 👤 **Personalized Experience** — Tailored recommendations powered by your profile and style preferences.

> 📱 **Cross-Platform** — Built with React Native (Expo) for Android and iOS.

<a id="tech-stack"></a>
# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| 📱 **Frontend** | React Native (Expo) • React Navigation • Context API • Axios • React Native Reanimated |
| ⚙️ **Backend** | Node.js • Express.js |
| 🗄️ **Database** | MongoDB • Mongoose |
| 🔐 **Authentication** | Firebase Authentication • JWT |
| ☁️ **Cloud Storage** | Cloudinary |

<a id="architecture"></a>
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

<a id="recommendation-engine"></a>
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

<a id="project-structure"></a>
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

<a id="screenshots"></a>
# 📸 Screenshots

<p align="center">
  <img src="screenshots/home.jpeg" width="220"/>
  <img src="screenshots/add.jpeg" width="220"/>
  <img src="screenshots/closet.jpeg" width="220"/>
</p>

<p align="center">
  <b>Home</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Add Item</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Digital Closet</b>
</p>

<br>

<p align="center">
  <img src="screenshots/outfit-builder.jpeg" width="220"/>
  <img src="screenshots/planner.png" width="220"/>
  <img src="screenshots/profile.jpeg" width="220"/>
</p>

<p align="center">
  <b>Outfit Builder</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Planner</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Profile</b>
</p>


<a id="api-endpoints"></a>
# 🌐 REST API

| Module | Method | Endpoint | Description |
|--------|:------:|----------|-------------|
| 🔐 Authentication | POST | `/api/auth/signup` | Register a new user |
|  | POST | `/api/auth/login` | Authenticate user |
|  | POST | `/api/auth/google` | Google Sign-In |
| 👤 Users | GET | `/api/users/profile` | Retrieve user profile |
|  | PUT | `/api/users/profile` | Update user profile |
| 👔 Closet | GET | `/api/items` | Fetch all wardrobe items |
|  | POST | `/api/items` | Add a new clothing item |
|  | GET | `/api/items/:id` | Get a clothing item by ID |
|  | PUT | `/api/items/:id` | Update a clothing item |
|  | DELETE | `/api/items/:id` | Remove a clothing item |
| 🎨 Outfits | GET | `/api/outfits` | Fetch saved outfits |
|  | POST | `/api/outfits` | Save a new outfit |
|  | GET | `/api/outfits/:id` | Get outfit details |
|  | PUT | `/api/outfits/:id` | Update an outfit |
|  | DELETE | `/api/outfits/:id` | Delete an outfit |
| 📅 Planner | GET | `/api/planner` | Retrieve planned outfits |
|  | POST | `/api/planner` | Create a new plan |
|  | GET | `/api/planner/:id` | Get planner details |
|  | PUT | `/api/planner/:id` | Update a planner entry |
|  | DELETE | `/api/planner/:id` | Delete a planner entry |
| 🤖 AI Recommendations | POST | `/api/recommendation` | Generate AI outfit recommendations |

<a id="database"></a>
# 🗄️ Database Overview

- User
- Item
- Outfit
- Planner

Relationships:
- One User → Many Items
- One User → Many Outfits
- One User → Many Planner Entries

<a id="installation"></a>
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

<a id="environment-variables"></a>
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

<a id="demo"></a>
# 🎥 Demo

Add your demo video:

```
https://youtu.be/YOUR_VIDEO_ID
```

<a id="deployment"></a>
# 🚀 Deployment

- Mobile App: Expo EAS
- Backend: Render/Railway
- Database: MongoDB Atlas
- Images: Cloudinary

<a id="roadmap"></a>
# 🗺️ Roadmap

- Weather integration
- Laundry tracking
- Capsule wardrobe
- Fashion trends
- Shopping recommendations
- Social sharing

<a id="contributing"></a>
# 🤝 Contributing

Fork the repository, create a feature branch, commit your changes, and open a pull request.

<a id="license"></a>
# 📄 License

MIT License.

<a id="author"></a>
# 👨‍💻 Author

**Mohith Reddy**

- Full Stack Developer (MERN)
- React Native Developer
- B.Tech CSE (2026)

⭐ If you like this project, consider giving it a star!
