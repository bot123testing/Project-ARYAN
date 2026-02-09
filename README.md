# Project ARYAN

Project ARYAN is a civic-tech platform designed to bridge the gap between citizens, government schemes, and NGO resources. It provides a centralized interface for scheme discovery, a live resource map, and an AI assistant for eligibility checks.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Leaflet Maps, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI/ML:** Tesseract.js (OCR), Custom AI Assistant (Prompt Engineering)

---

## Quick Start – Local Development

You can run this project either using **Docker** (Recommended) or **Manually**.

### Option 1: Using Docker (Recommended)
Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bot123testing/Project-ARYAN.git
    cd Project-ARYAN
    ```

2.  **Run with Docker Compose:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the App:**
    -   **Frontend:** [http://localhost:5173](http://localhost:5173)
    -   **Backend:** [http://localhost:5000](http://localhost:5000)

---

### Option 2: Manual Setup (Without Docker)

#### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URL)

#### 1. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up Environment Variables:
    -   Create a `.env` file in the `server` folder.
    -   Add: `MONGO_URI=your_mongodb_connection_string` (or skip to use Mock Data mode).
4.  Start the server:
    ```bash
    npm start
    ```

#### 2. Frontend Setup
1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) to view the app.
