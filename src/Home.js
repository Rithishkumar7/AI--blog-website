import React, { useEffect, useState } from 'react';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://blog-backend-da3s.onrender.com' 
      : '';

  useEffect(() => {
    fetch(`${apiUrl}/api/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <h1 style={{ textAlign: "center", marginTop: 32, marginBottom: 16 }}>AI BLOG WEBSITE</h1>
          <p style={{ textAlign: "center", fontSize: "1.15em", marginBottom: 40 }}>
            Welcome to our blog! Discover stories, tutorials, and insights from developers, writers, and creators.
          </p>
          <div className="blog-container">
            {posts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <div>
                {posts.map((post) => (
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;