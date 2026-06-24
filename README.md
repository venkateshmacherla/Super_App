# Super App

A React-based entertainment dashboard application built using Vite, React, Zustand, Tailwind CSS, and external APIs. The application allows users to register, select entertainment preferences, view personalized content, and explore movie recommendations.

##  Features

### 1. User Registration

- Register with Name, Username, Email, and Mobile Number
- Form validation with proper error handling
- User data stored using Zustand

### 2. Category Selection

- Select entertainment categories of interest
- Minimum 3 categories required
- Selected categories stored globally

### 3. Personalized Dashboard

- User profile information
- Live Weather Widget
- Live News Feed with auto-refresh every 2 seconds
- Notes Widget with persistent storage
- Countdown Timer Widget

### 4. Entertainment Recommendations

- Movie recommendations based on selected categories
- Data fetched dynamically from Movie API
- Browse movies according to user preferences

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM

### State Management

- Zustand
- Zustand Persist Middleware

### APIs

- OpenWeatherMap API
- News API
- TMDB Movie API

### Other Libraries

- Axios
- React Icons

---

##  Project Structure

```bash
src
│
├── assets
│   ├── images
│
├── components
│   ├── registration
│   ├── Notes.jsx
│   ├── Timer.jsx
│
├── pages
│   ├── Register.jsx
│   ├── Categories.jsx
│   ├── Dashboard.jsx
│   ├── Movies.jsx
│
├── services
│   ├── weatherService.js
│   ├── newsService.js
│   ├── movieService.js
│
├── store
│   ├── useStore.js
│
├── routes
│   ├── AppRoutes.jsx
│
└── App.jsx
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd super-app
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_NEWS_API_KEY=your_news_api_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### Start Development Server

```bash
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

## Application Flow

```text
Registration
      ↓
Category Selection
      ↓
Dashboard
      ↓
Movie Recommendations
```

---

## Assignment Requirements Covered

- User Registration
- Form Validation
- Category Selection
- Global State Management using Zustand
- Weather API Integration
- News API Integration
- Movie Recommendation API Integration
- Notes Persistence
- Timer Functionality
- Dynamic Content Rendering
- Tailwind CSS Styling
- Responsive Component Structure
- Clean Folder Architecture
- Extra: back navigation within pages

---

## Author

Venkatesh Macharla

Frontend Developer passionate about building scalable and user-friendly web applications using React, Next.js, TypeScript, JavaScript, and modern web technologies.
