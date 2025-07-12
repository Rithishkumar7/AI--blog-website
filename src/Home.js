import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://blog-backend-da3s.onrender.com';
    console.log('API URL:', apiUrl); // Debug log
    
    // Test if the backend is reachable
    fetch(`${apiUrl}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Health check response:', res.status);
        if (!res.ok) {
          throw new Error(`Health check failed! status: ${res.status}`);
        }
        return res.json();
      })
      .then((healthData) => {
        console.log('Health check data:', healthData);
        
        // Now fetch posts
        return fetch(`${apiUrl}/api/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      })
      .then((res) => {
        console.log('Posts response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Posts data:', data); // Debug log
        setPosts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        console.error("API URL used:", apiUrl);
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          {/* Blog Title */}
          <h1 style={{ textAlign: "center", marginTop: 32, marginBottom: 16 }}>AI BLOG WEBSITE </h1>
          {/* Welcome Paragraph */}
          <p style={{ textAlign: "center", fontSize: "1.15em", marginBottom: 40 }}>
            Welcome to our blog! Discover stories, tutorials, and insights from developers, writers, and creators. Stay updated with the latest posts and ideas that matter.
          </p>
          {/* Posts Section */}
          <div className="blog-container">
            {posts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              posts.map((post) => (
                <div className="card" key={post._id}>
                  <div className="card-header">
                    <h2>{post.name}</h2>
                  </div>
                  <div className="card-body" style={{ position: "relative" }}>
                    <p style={{ 
                      wordWrap: "break-word", 
                      overflowWrap: "break-word", 
                      hyphens: "auto",
                      overflow: "hidden",
                      maxHeight: "4.5em",
                      lineHeight: "1.5em",
                      display: "block"
                    }}>
                      {post.description.split(' ').slice(0, 10).join(' ') + (post.description.split(' ').length > 10 ? '...' : '')}
                    </p>
                    <span className="category-tag" data-category={post.category}>
                      {post.category}
                    </span>
                    <div style={{ marginTop: "10px" }}>
                      <Link to={`/posts/${post._id}`} className="read-more-link">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;