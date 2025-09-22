import { useContext, useState } from "react"
import "./topbar.css"
import { Link } from "react-router-dom"
import { Context } from "../context/Context"

export default function Topbar() {
  const {user, dispatch} = useContext(Context);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const PF = "https://react-blogb-2.onrender.com/images/"

const handleLogout = () =>{
  dispatch({type:"LOGOUT"})
}

const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
}

  return (
    <nav className='navbar'>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <Link to='/' className="brand-link">
            <span className="brand-text">Blog</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <div className="navbar-nav">
            <Link to='/' className="nav-link">Home</Link>
            {user && <Link to='/write' className="nav-link">Write</Link>}
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-name">{user.username}</span>
                <Link to="/settings" className="user-avatar">
                  {user.profilePic ? (
                    <img src={PF + user.profilePic} alt="Profile" className="avatar-img" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i>
                <span className="logout-text">Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">Login</Link>
              <Link to="/register" className="auth-btn register-btn">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav">
          <Link to='/' className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          {user && (
            <Link to='/write' className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Write
            </Link>
          )}
          {user ? (
            <>
              <Link to='/settings' className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Settings
              </Link>
              <button onClick={() => {handleLogout(); setIsMobileMenuOpen(false);}} className="mobile-nav-link logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to='/register' className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Social Links - Hidden on mobile, shown as overlay on larger screens */}
      <div className="social-overlay">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/nitin-k666/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100057349644056" target="_blank" rel="noopener noreferrer" className="social-link facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/nitin.x6/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/home" target="_blank" rel="noopener noreferrer" className="social-link twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </nav>
  )
}

