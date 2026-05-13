# PG Finder Frontend

## Setup Frontend Locally

### 1. Go To Frontend Folder
### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## API Base URL

Inside frontend API files use:


---

## Frontend Deployment on Vercel

### Framework Preset

```bash
Vite
```

### Build Command

```bash
npm run build
```

### Output Directory

```bash
dist
```

---

## Features

* Responsive UI
* User Login & Signup
* Provider Dashboard
* Add Listings
* Room Search
* Room Details Page
* Image Upload Support

---

## Tech Stack

* React.js
* Vite
* React Router DOM
* Axios
* CSS


# PG Finder Backend
## Setup Backend Locally
### 1. Clone Project

### 2. Go To Backend Folder

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Create `.env` File

Create a `.env` file inside backend folder.

```env
MONGO_URL=your_mongodb_atlas_url
PORT=5000
```

---

### 5. Start Backend

```bash
npm start
```

Server will run on:

```bash
http://localhost:5000
```

---

## Backend Deployment on Render

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Environment Variables

Add these variables inside Render:

| KEY       | VALUE                          |
| --------- | ------------------------------ |
| MONGO_URL | your_mongodb_connection_string |

---

## Features

* User Authentication
* Provider Authentication
* Room Listings
* Image Uploads
* MongoDB Database
* REST APIs

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* CORS
