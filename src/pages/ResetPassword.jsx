import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  // axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false); //""
  const [otp, setOtp] = useState(""); //0
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key.toLowerCase() === "backspace" &&
      e.target.value === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("").slice(0, 6);
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEamil = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      // data.success ? toast.success(data.message) : toast.error(data.message);
      // data.success && setIsEmailSent(true);
      // setTimeout(() => inputRefs.current[0]?.focus(), 100); // Autofocus OTP
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
        setTimeout(() => inputRefs.current[0]?.focus(), 100); // Auto-focus first OTP box
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    // const otpArray = inputRefs.current.map(e=> e.value.repalce)
    // setOtp(otpArray.join(""))
    const otpArray = inputRefs.current.map((e) => e.value.replace(/\D/g, ""));
    const joinedOtp = otpArray.join("");

    if (joinedOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setOtp(joinedOtp);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen  
            bg-gradient-to-br from-blue-300 to-purple-400"
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20
              top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* enter the email id */}

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEamil}
          className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div
            className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full
         bg-[#333A5C]"
          >
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email id"
              className="bg-transparent outline-none text-white"
              required
            />
          </div>
          <button
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500
        to-indigo-900 text-white rounded-full mt-3 cursor-pointer"
          >
            Submit
          </button>
        </form>
      )}

      {/* otp input form  //ading the OTP */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to email id
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl 
            rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900
         text-white rounded-full cursor-pointer "
          >
            Submit
          </button>
        </form>
      )}

      {/* //enter new password */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password below
          </p>
          <div
            className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full
         bg-[#333A5C]"
          >
            <img src={assets.lock_icon} alt="" className="w-3 h-3" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="New Password"
              className="bg-transparent outline-none text-white"
              required
            />
          </div>
          <button
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500
        to-indigo-900 text-white rounded-full mt-3 cursor-pointer"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
