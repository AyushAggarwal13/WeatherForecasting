# MERN Live Weather Forecast App

A full-stack MERN application providing real-time weather and 5-day forecast using OpenWeatherMap API.

## Tech Stack
- **Frontend:** React (functional components, hooks), Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose

## Features
- Search weather by city name
- Live weather and 5-day forecast
- Stores search history in MongoDB
- Auto-refresh every 5 minutes
- Clean blue/white UI

## Setup Instructions

### 1. Clone the repository

```
git clone <repo-url>
cd WEATHERAPP
```

### 2. Backend Setup

```
cd server
npm install
cp .env.example .env
# Fill in your OpenWeatherMap API key and MongoDB URI in .env
npm run dev
```

### 3. Frontend Setup

```
cd ../client
npm install
npm start
```

### 4. Access the App

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables
See `.env.example` in the `server` folder for required variables.

## Folder Structure
- `client/` - React frontend
- `server/` - Express backend (MVC)

## API Endpoint
- `GET /api/weather?city=cityName`

## License
MIT
