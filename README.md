# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# MERN Auth Frontend 💻

This is the **React.js frontend** for a MERN stack authentication system. It provides a responsive and modern UI for user registration, login, and OTP-based email verification using **Tailwind CSS** and **Axios** for API communication.

---

## 📂 Project Structure
client_frontend/
├── node_modules/
├── public/
│   ├── bg_img.png
│   └── favicon.svg
├── src/
│   ├── assets/                 # Static assets (images, etc.)
│   ├── components/             # Reusable UI components
│   │   ├── Header.jsx
│   │   └── NavBar.jsx
│   ├── context/
│   │   └── AppContext.jsx      # React Context API for global state
│   ├── pages/                  # Application pages
│   │   ├── EmailVerify.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── ResetPassword.jsx
│   ├── App.jsx                 # Main App component
│   ├── index.css               # Global CSS
│   └── main.jsx                # Entry point for the app
├── .env                        # Environment variables (should be in .gitignore)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js             # Vite configuration


---

## 🚀 Features

✅ User-friendly UI for registration & login  
✅ OTP-based email verification  
✅ JWT-based protected navigation  
✅ Responsive design with Tailwind CSS  
✅ Global state management using React Context  
✅ Loader animations & toast notifications  
✅ Axios integration for API calls  

---

## 🛠️ Tech Stack

- **React.js**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **React Toastify**
- **Context API**
- **dotenv**

---

## 🔗 Environment Setup

Create a `.env` file in the root with:
VITE_BACKEND_URL=http://localhost:5000


> Change this to your hosted backend URL when deploying.

---

## 📦 Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/mern-auth-frontend.git
cd mern-auth-frontend

# Install dependencies
npm install

# Start the React app
npm run dev

🧪 Pages
Route	Description
/register	User Registration Form
/login	User Login Form
/verify	OTP Verification Page
/dashboard	Protected Dashboard (JWT only)

⚙️ How It Works
User registers → gets OTP via email
Enters OTP → verified → JWT stored
Protected routes use AppContext to check auth
Axios sends token in headers for secure calls

✨ Sample Axios Setup
js
Copy
Edit
axios.post(`${BASE_URL}/api/auth/login`, {
  email,
  password
});

🙋‍♀️ Author
Rajeshwari Kondian
💼 MERN Stack Developer
📬 LinkedIn(https://www.linkedin.com/in/rajeshwari-k-g-917414209/)

🙏 Acknowledgements
Tailwind CSS
React Router
Axios
Open Source Community

