# ARYAN (Ayushman Rashtriya Yojana Anudan Network)

**Subtitle:** An Integrated Portal for Government Policy Discovery and NGO Resource Mapping.

---

## 1. Vision Document

### **1.1 Project Overview**
ARYAN is a web-based integrated welfare platform designed to bridge the "dual information gap" in social services. It serves as a unified search engine that connects citizens to long-term Government Schemes (e.g., Ayushman Bharat) and immediate NGO relief (e.g., Food, Medicine) in a single interface. The platform features a unique "Anti-Gravity" UI to make the user experience engaging and modern.

### **1.2 Problem It Solves**
Many citizens, particularly those from low-income backgrounds, fail to receive the support they deserve due to two main issues:
1.  **Complexity:** Government welfare schemes are often buried in complex official websites, making it difficult for eligible people to find them.
2.  **Fragmentation:** Local NGO services (immediate relief) are rarely listed in one central place.
This project addresses these issues by providing a simplified, single-window platform where users can discover both long-term policies and immediate assistance.

### **1.3 Target Users (Personas)**
* **The Rural Citizen:** Low digital literacy; needs financial aid for health or housing.
* **The Urban Daily Wager:** Needs immediate food or medical support from local NGOs during a crisis.
* **The NGO Administrator:** Wants to list their organization's services to reach more people in need efficiently.
* **The Government Official:** Needs data on which schemes are most searched for in specific regions to improve policy outreach.

### **1.4 Vision Statement**
To democratize access to social welfare by creating a zero-friction, highly accessible digital bridge that connects every eligible citizen to the government aid and local resources they are entitled to.

### **1.5 Key Features / Goals**
* **Unified Database:** A centralized repository combining Government Schemes and NGO directories.
* **Eligibility Engine:** A logic-based filter that matches users to schemes based on Age, Income, and Location.
* **Anti-Gravity UI:** A visually immersive "floating" interface using React and Framer Motion.
* **Actionable Cards:** Distinct color-coded results (Blue for Govt, Green for NGO) for easy identification.

### **1.6 Success Metrics**
* **Search Accuracy:** 90% of users find at least one eligible scheme within 2 minutes.
* **User Retention:** 40% of users returning to check for new schemes.
* **Performance:** Page load time under 1.5 seconds despite heavy visual effects.

### **1.7 Assumptions & Constraints**
* **Assumption:** Users will have basic internet connectivity.
* **Assumption:** Government scheme data remains publicly accessible for scraping or manual entry.
* **Constraint:** The initial prototype will focus only on Health and Education sectors.
* **Constraint:** Only open-source technologies (MERN/PERN Stack) will be used.

---

## 2. MoSCoW Prioritization

| Priority | Features |
| :--- | :--- |
| **Must Have** | User Profile Input (Age/Income), Government Scheme Database, NGO Directory, Eligibility Filter Logic, Basic Search Functionality. |
| **Should Have** | "Anti-Gravity" UI Animations, "Call Now" Button for NGOs, Google Maps Integration for Locations, Role-Based Dashboards (Admin/User). |
| **Could Have** | Language Toggle (Hindi/English), Save/Bookmark Schemes, Dark Mode Toggle. |
| **Won't Have** | Direct Online Application Submission (Govt API restrictions), Real-time Chat Support, Mobile App (Android/iOS). |

---

## 3. Local Development Tools

The following tools were used to build and test this project:
* **Frontend:** React.js, Vite, Framer Motion (for animations), Tailwind CSS.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (via Mongoose ODM).
* **Containerization:** Docker Desktop.
* **Version Control:** Git & GitHub.
* **IDE:** Visual Studio Code.
* **Design:** Figma (Wireframes), Draw.io (Architecture).

---

## 4. Branching Strategy

This project follows the **GitHub Flow** strategy to ensure code stability and continuous delivery.

* **`main` Branch:** This branch contains the stable, production-ready code. No direct commits are made here.
* **Feature Branches (`feature/xyz`):** * For every new feature (e.g., `feature/login-page`, `feature/ngo-api`), a new branch is created from `main`.
    * Development happens in these isolated branches.
    * Once tested, a **Pull Request (PR)** is created to merge the feature back into `main`.


## 5. Quick Start – Local Development

Follow these instructions to set up the project locally using Docker.

### **Prerequisites**
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
* [Git](https://git-scm.com/) installed.

### **Installation Steps**

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/ARYAN-Project.git](https://github.com/YOUR_USERNAME/ARYAN-Project.git)
    cd ARYAN-Project
    ```

Instruction
1.	Clone the repository:
2.	git clone https://github.com/bot123testing/Project-ARYAN.git
cd Project-ARYAN
3.	Run with Docker Compose:
docker-compose up --build
4.	Access the App:
o	Frontend: http://localhost:5173
o	Backend: http://localhost:5000


4.  **Stop the Application**
    To stop the containers, press `Ctrl + C` in the terminal or run:
    ```bash
    docker-compose down
    ```
