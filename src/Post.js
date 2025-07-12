import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/posts/${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <div className="wrapper"><div className="content"><div className="container"><p>Loading...</p></div></div></div>;
  if (error) return <div className="wrapper"><div className="content"><div className="container"><p>Error: {error}</p></div></div></div>;
  if (!post) return null;

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1>{post.name}</h1>
            </div>
            <div className="card-body">
              <span className="category-tag" data-category={post.category}>
                {post.category}
              </span>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;