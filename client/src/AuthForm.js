import "./css/AuthForm.css";
import Login from "./Login";
import Signup from "./Signup";

import { useState } from "react";

import "./css/AuthForm.css";

function AuthForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const toSignupForm = () => {
    if (isLoggingIn) setIsLoggingIn(!isLoggingIn);
  };
  const toLoginForm = () => {
    if (!isLoggingIn) setIsLoggingIn(!isLoggingIn);
  };
  return (
    <div className="auth-form">
      <div className="auth-buttons">
        <div
          className={`auth-button ${isLoggingIn && "active"} mr-3`}
          onClick={toLoginForm}
        >
          Login
        </div>
        <button
          className={`auth-button ${!isLoggingIn && "active"}`}
          onClick={toSignupForm}
        >
          Signup
        </button>
      </div>
      <br />
      {isLoggingIn ? <Login /> : <Signup />}
    </div>
  );
}

export default AuthForm;
