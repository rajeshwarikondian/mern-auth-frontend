import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (state === "Sign Up") {
        res = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
      } else {
        res = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
      }

      const data = res.data;

      if (data.success) {
        console.log("Auth Success:", data);

        // ✅ Save token in localStorage
        localStorage.setItem("token", data.token);

        // ✅ Set axios auth header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setIsLoggedIn(true);
        getUserData(); // No need to pass userId
        navigate("/");

        setEmail("");
        setPassword("");
        setName("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 
           sm:px-0 bg-gradient-to-br from-blue-300 to-purple-400"
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20
           top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div
        className="bg-slate-900 p-10 rounded-lg shadow-lg w-full 
           sm:w-96 text-indigo-300 text-sm"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login "}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none"
              type="email"
              placeholder="Email id"
              required
              name="email"
              autoComplete="email"
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password ?
          </p>

          <button
            className="w-full py-2.5 rounded-full bg-gradient-to-r
           from-indigo-300 to-indigo-700 text-white font-medium cursor-pointer"
          >
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account ?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-2">
            Don't have an account ?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
export default Login;
