import React, { useState } from "react";
import "./home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

function AuthModal({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!password.trim()) {
    newErrors.password = "Password is required.";
  } else if (!passwordRegex.test(password)) {
    newErrors.password = "Password must be at least 6 characters long, with at least one letter and one number.";
  }
  
  if (isRegistering && !name.trim()) {
    newErrors.name = "Name is required.";
  }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setErrorMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.displayName);
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      console.error("Error logging in:", error.message);
      setErrorMessage("Invalid credentials. Please check your email and password.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setErrorMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      console.log("User registered and profile updated:", user);
      setEmail("");
      setPassword("");
      setName("");
      onClose();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already registered. Please log in.");
      } else {
        console.error("Error registering:", error.message);
        setErrorMessage("An error occurred during registration. Please try again.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
  
    if (isRegistering) {
      handleRegister(e);
    } else {
      handleLogin(e);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User logged in with Google:", user);
      onClose();
      setShowAuthModal(false);
    }catch (error) {
      if (error.code === "auth/cancelled-popup-request" || error.code === "auth/popup-closed-by-user") {
        console.log("Popup closed by user or request cancelled.");
      } else {
        console.error("Error logging in with Google:", error.message);
      }
    }
  };

  return (
    <div className={`backdrop ${show ? "show" : ""}`} onClick={onClose}>
    <div
      className={`auth-modal ${show ? "slide-up" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="d-grid justify-content-center">
      <FontAwesomeIcon className="icon-auth" icon={faCircleUser} />
      </div>
      <h2 className="auth-title text-center pt-2 mb-1">Sign In</h2>
      <p className="text-center parag-auth">
        To keep up with new products<br/> and receive personalized recommendations
      </p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form noValidate onSubmit={handleSubmit}>
      {isRegistering && (
            <div className="form-group">
              <label htmlFor="name" className="label-name">Your name<sup>*</sup></label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
               {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
          )}
        <div className="form-group">
          <label htmlFor="email" className="label-email">Email<sup>*</sup></label><span></span>
          <input
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label-pass">Password<sup>*</sup></label><span></span>
          <div className="password-container">
            <input
               type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
             >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <div className="base-auth-button">
        <button type="submit" className="auth-button">
        {isRegistering ? "Sign Up" : "Sign In"}
        </button>
        </div>
      </form>
      <div className="divider">
          <span>or</span>
        </div>
        <div className="google">
        <button className="google-button" onClick={handleGoogleLogin}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
        <g id="Group">
            <path id="Vector" d="M16 8.18034C16 7.65367 15.9524 7.15366 15.8707 6.66699H8.17371V9.6737H12.5807C12.3832 10.6604 11.8042 11.4937 10.946 12.0604V14.0604H13.5752C15.1146 12.6671 16 10.6137 16 8.18034Z" fill="#5384EC"></path>
            <path id="Vector_2" d="M8.17401 16C10.3809 16 12.2269 15.28 13.5755 14.06L10.9463 12.06C10.2106 12.54 9.27748 12.8333 8.17401 12.8333C6.04202 12.8333 4.23697 11.4266 3.58988 9.52661H0.878906V11.5866C2.22077 14.2 4.97942 16 8.17401 16Z" fill="#58A55C"></path>
            <path id="Vector_3" d="M3.58966 9.52672C3.41937 9.04672 3.33082 8.53338 3.33082 8.00004C3.33082 7.4667 3.42618 6.95336 3.58966 6.47335V4.41333H0.878682C0.320139 5.49334 0 6.70669 0 8.00004C0 9.29339 0.320139 10.5067 0.878682 11.5867L3.58966 9.52672Z" fill="#F1BE42"></path>
            <path id="Vector_4" d="M8.17401 3.1667C9.37965 3.1667 10.4559 3.57338 11.3073 4.36672L13.6368 2.08669C12.2269 0.793343 10.3809 0 8.17401 0C4.97942 0 2.22077 1.80002 0.878906 4.41339L3.58988 6.47341C4.23697 4.57339 6.04202 3.1667 8.17401 3.1667Z" fill="#D85140"></path>
        </g>
       </svg>
          Continue with Google
        </button>
        </div>
        <div className="text-center">
          <button
            className="switch-to-register"
            onClick={() => setIsRegistering((prev) => !prev)}
          >
            {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
    </div>
  </div>
  );
}


export default AuthModal;
