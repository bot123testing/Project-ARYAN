# Project ARYAN - Complete Architecture & Codebase Details

This document provides a highly detailed, file-by-file breakdown of the entire ARYAN (Ayushman Rashtriya Yojana Anudan Network) project. You can feed this entire document into any LLM to give it full context of the project's structure, files, and logic.

## 1. High-Level Architecture
Project ARYAN is built using the **MERN Stack** (MongoDB, Express, React, Node.js) and is entirely containerized using Docker.
- **Frontend (`client/`)**: Built with React (Vite) and styled with Tailwind CSS. It handles the UI, routing, and OCR-based document scanning (using Tesseract.js).
- **Backend (`server/`)**: Built with Node.js and Express. It acts as the API layer, managing User Authentication, generating JWTs, sending verifying emails, and communicating with the database.
- **Database**: MongoDB, running inside a Docker container, used to store User profiles, NGOs, and Scheme data.
- **Orchestration**: `docker-compose.yml` ties the frontend, backend, and database together into a single isolated Docker network.

---

## 2. Root Directory Files

* **`docker-compose.yml`**
  - **Purpose**: The master orchestration file for Docker.
  - **Details**: Defines three services: `client` (React app on port 5173), `server` (Node API on port 5000), and `mongo` (MongoDB database on port 27017). It establishes a bridge network (`aryan-network`) so these containers can communicate securely without exposing the database to the internet. Uses volumes to persist MongoDB data locally.
* **`README.md`**
  - **Purpose**: The project's main documentation.
* **`.gitignore` & `.dockerignore`**
  - **Purpose**: Prevents node_modules, `.env` files, and local log files from being tracked by Git or copied into Docker images, keeping builds lightweight and secure.

---

## 3. The Backend (`server/` directory)

The backend is responsible for secure data management, authentication, and serving API routes.

### 3.1 Server Root
* **`server/index.js`**
  - **Purpose**: The absolute entry point of the Node.js application.
  - **Details**: Initializes the Express application. Configures CORS (to allow the React frontend to communicate with it), parses incoming JSON payloads, connects to MongoDB using Mongoose, and mounts the API route handlers (e.g., `/api/auth`, `/api/schemes`). It listens on port 5000.
* **`server/Dockerfile`**
  - **Purpose**: Instructions to build the Node.js Docker image.
  - **Details**: Pulls a lightweight Node image, copies `package.json`, runs `npm install`, copies the rest of the backend source code, and exposes port 5000.
* **`server/.env`**
  - **Purpose**: Stores secret environment variables (e.g., `MONGO_URI`, `JWT_SECRET`, Email Credentials).

### 3.2 Models (`server/models/`)
These files define the MongoDB schema structures using Mongoose.
* **`User.js`**
  - **Purpose**: Defines the data structure for a registered user.
  - **Details**: Contains fields for `name`, `email`, `password`, `isVerified`, and a `verificationToken`. It is used to save and retrieve user credentials securely.
* **`Scheme.js`**
  - **Purpose**: Defines the structure for Government Schemes.
  - **Details**: Stores scheme names, sectors, descriptions, eligibility criteria, and official government portal links.
* **`NGO.js`**
  - **Purpose**: Defines the structure for local NGOs.
  - **Details**: Stores NGO names, contact info, locations, and the type of immediate relief they provide.

### 3.3 Routes (`server/routes/`)
These handle the specific API endpoints called by the React frontend.
* **`auth.js`**
  - **Purpose**: Manages all authentication logic.
  - **Details**: 
    - `POST /register`: Hashes passwords using `bcryptjs`, creates a user, generates a random 6-digit OTP, and sends a verification email using `nodemailer`.
    - `POST /verify-email`: Checks if the user-provided OTP matches the database. If so, marks the user as `isVerified=true`.
    - `POST /login`: Compares passwords. If correct, generates and returns a JSON Web Token (`jsonwebtoken`) to maintain the user's session.
* **`schemes.js`** & **`ngos.js`**
  - **Purpose**: Endpoints to perform CRUD operations on the Schemes and NGOs collections in MongoDB.

---

## 4. The Frontend (`client/` directory)

The frontend handles all user interactions, visual elements, routing, and the heavy-lifting of the OCR Eligibility matching algorithm.

### 4.1 Client Root
* **`client/vite.config.js`**, **`client/tailwind.config.js`**, **`client/postcss.config.js`**
  - **Purpose**: Configuration files for the Vite build tool and Tailwind CSS styling framework.
* **`client/Dockerfile`**
  - **Purpose**: Docker configuration for the React application.
  - **Details**: Installs dependencies and runs the Vite development server exposed on port 5173.
* **`client/package.json`**
  - **Purpose**: Lists frontend dependencies, notably `react-router-dom` (routing), `framer-motion` (animations), and `tesseract.js` (OCR).

### 4.2 Source Code (`client/src/`)
* **`main.jsx`**
  - **Purpose**: The React entry point that injects the app into `index.html`.
* **`App.jsx`**
  - **Purpose**: The main router component.
  - **Details**: Uses `react-router-dom` to map URL paths to specific Page components (e.g., `/` maps to `<Home />`, `/login` to `<Login />`). Also handles global layout elements like wrapping pages with the `<Header />` and `<Footer />`.
* **`index.css`**
  - **Purpose**: Global CSS imports, mainly initializing Tailwind CSS directives.

### 4.3 Pages (`client/src/pages/`)
These are the main view components of the application.
* **`Home.jsx`**
  - **Purpose**: The landing page of Project ARYAN. Contains the hero section, the "How it Works" guide, and calls to action.
* **`Login.jsx`**
  - **Purpose**: Handles both User Registration and Login.
  - **Details**: Contains a toggleable form. When registering, it hits the backend `/api/auth/register` endpoint. Upon success, it redirects to the verification page. On login, it hits `/api/auth/login`, saves the JWT token to `localStorage`, and updates the UI state globally.
* **`VerifyEmail.jsx`**
  - **Purpose**: A page containing a 6-digit OTP input form.
  - **Details**: Submits the OTP to the backend to complete the user registration loop.
* **`EligibilityScanner.jsx`**
  - **Purpose**: The core processing hub of the app. It calculates which schemes a user is eligible for.
  - **Details**: 
    - **UI**: Provides dropdowns for "Sector" and "Profession", and an image upload input for documents.
    - **OCR Logic**: Triggers `Tesseract.recognize` on the uploaded image to extract raw text (e.g., from an Aadhaar, Pan Card, or Income Certificate).
    - **Matching Algorithm**: Compares the user's selected sector, profession, and the OCR extracted keywords against the local database. It assigns weighted scores (Sector=40%, Profession=35%, Keywords=25%), calculates a final `matchPercentage`, and sorts the results to display matching Government Scheme cards to the user.
* **`FindAid.jsx`**
  - **Purpose**: A page dedicated to mapping users to immediate NGO relief based on location and aid category (Food, Medical, etc.).
* **`MapPage.jsx`**
  - **Purpose**: Renders visual map locations for nearby NGOs.

### 4.4 Data (`client/src/data/`)
* **`schemesDB.js`**
  - **Purpose**: A JSON-like data structure acting as the primary lookup table for the Eligibility Scanner.
  - **Details**: Contains detailed objects for dozens of Indian Government Schemes. Each object has a `name`, `sector`, `targetProfessions`, `description`, `officialLink`, and critically, a `keywords` array. The OCR engine physically looks for these exact `keywords` in the uploaded documents to boost the match probability score to >70%.

### 4.5 Components (`client/src/components/`)
Reusable UI pieces used across multiple pages.
* **`Header.jsx`**
  - **Purpose**: The top navigation bar. Includes links to the Scanner, Aid pages, and conditionally renders the Login/Logout buttons based on the user's authentication state.
* **`Hero.jsx`**
  - **Purpose**: The large visual banner used on the Home page.
* **`Footer.jsx`**
  - **Purpose**: The bottom section of the site containing copyright and supplementary links.
