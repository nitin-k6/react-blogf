import React, { useEffect, useState } from "react";
import Header from "../../header/Header"
import Posts from "../../posts/Posts"
import Sidebar from "../../sidebar/Sidebar"
import "./home.css"
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://react-blogb-2.onrender.com/posts/" + search);
        setPosts(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  if (loading) {
    return (
      <>
        <Header/>
        <div className="home-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading posts...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header/>
        <div className="home-container">
          <div className="error-container">
            <i className="fas fa-exclamation-triangle error-icon"></i>
            <h3 className="error-title">Something went wrong</h3>
            <p className="error-message">{error}</p>
            <button 
              className="retry-button" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header/>
      <div className="home-container">
        <main className="main-content">
          <div className="content-wrapper">
            <div className="posts-section">
              <div className="section-header">
                <h2 className="section-title">Latest Stories</h2>
                <p className="section-subtitle">
                  Discover amazing stories from our community
                </p>
              </div>
              <Posts posts={posts} />
            </div>
            
            <aside className="sidebar-section">
              <Sidebar/>
            </aside>
          </div>
        </main>
      </div>
    </>
  )
}
