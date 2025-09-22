import { useContext, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useRef } from "react";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching, error} = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
     const res = await axios.post("https://react-blogb-2.onrender.com/login", {
      username: userRef.current.value, // can be username or email
      password: passwordRef.current.value,
     })
     dispatch({type:"LOGIN_SUCCESS", payload: res.data})
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username or Email</label>
            <div className="input-container">
              <i className="input-icon fas fa-user"></i>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your username or email"
                ref={userRef}
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
                placeholder="Enter your password"
                ref={passwordRef}
                required
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

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <span>Invalid credentials. Please try again.</span>
            </div>
          )}

          <button 
            className={`auth-button primary ${isFetching ? 'loading' : ''}`} 
            type="submit" 
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <i className="fas fa-arrow-right"></i>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Create one
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
