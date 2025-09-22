import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
   const [username, setUsername] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [error, setError] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try{
      const res = await axios.post("https://react-blogb-2.onrender.com/register", {
        username,
        email,
        password, 
      });
      if (res.data) {
        // Use React Router's navigate instead of window.location.replace
        navigate("/login", { 
          replace: true,
          state: { 
            message: "Registration successful! Please log in with your credentials.",
            registeredEmail: email 
          }
        });
      }
    }catch(err){
       setError("Registration failed. Username or email might already exist.");
    } finally {
      setIsLoading(false);
    }
   };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us and start sharing your stories</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-container">
              <i className="input-icon fas fa-user"></i>
              <input
                type="text"
                className="form-input"
                placeholder="Choose a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-container">
              <i className="input-icon fas fa-envelope"></i>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-container">
              <i className="input-icon fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength="6"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-container">
              <i className="input-icon fas fa-lock"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <span>{typeof error === 'string' ? error : 'Registration failed. Please try again.'}</span>
            </div>
          )}

          <button 
            className={`auth-button primary ${isLoading ? 'loading' : ''}`} 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-background">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
      </div>
    </div>
  )
}

