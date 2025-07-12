import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Compose = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [aiTopic, setAiTopic] = useState("");
  const [aiStatus, setAiStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: title,
          category: category,
          description: description,
        }),
      });
      if (response.ok) {
        alert("Post submitted successfully!");
        navigate("/");
      } else {
        alert("Failed to submit post.");
      }
    } catch (error) {
      alert("Error submitting post.");
    }
  };

  const handleAskAI = async () => {
    if (!aiTopic.trim()) {
      setAiStatus("Please enter a topic.");
      return;
    }
    setAiStatus("AI is writing your blog post...");
    try {
      const res = await fetch("/api/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "topic=" + encodeURIComponent(aiTopic),
      });
      const data = await res.json();
      if (data.text) {
        setDescription(data.text);
        setAiStatus("AI blog post generated! You can edit it below.");
      } else {
        setAiStatus("AI could not generate a blog post due to insufficient credits.");
      }
    } catch (e) {
      setAiStatus("Error contacting AI service.");
    }
  };

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1>COMPOSE</h1>
            </div>
            <div className="card-body">
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <select
                  name="category"
                  required
                  className="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Technical">Technical</option>
                  <option value="Personal">Personal</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
                <br />
                <textarea
                  name="description"
                  id="blog-description"
                  placeholder="Enter Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <br />
                <button type="submit" title="Add">
                  Publish
                </button>
              </form>
              <hr className="divider" />
              <div className="ai-chatbot">
                <label htmlFor="ai-topic" className="ai-label">
                  Let AI help you write a blog post:
                </label>
                <div className="ai-input-row">
                  <input
                    type="text"
                    id="ai-topic"
                    placeholder="Enter your topic (e.g. The Future of AI)"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                  />
                  <button
                    type="button"
                    id="ask-ai"
                    className="theme-toggle"
                    onClick={handleAskAI}
                  >
                    Ask AI ✨
                  </button>
                </div>
                <div id="ai-status" className="ai-status">
                  {aiStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
