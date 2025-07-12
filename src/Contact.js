import React from "react";

const Contact = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="container main-content" style={{ marginTop: 40 }}>
          <div className="card" style={{ maxWidth: 700, margin: "0 auto" }}>
            <div className="card-header">
              <h1>Contacts</h1>
            </div>
            <div className="card-body">
              <p style={{ fontSize: "1.1em", marginBottom: 18 }}>
                Have questions, feedback, or want to collaborate? We'd love to hear from you! Reach out to us through email or social media. Your thoughts make this blog better.
              </p>
              <div className="contact-links">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <a href="https://github.com/Rithishkumar7" target="_blank" rel="noopener noreferrer">🌐 GitHub</a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/in/rithish-janjeerapu-562a0229a" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
                  </li>
                  <li>
                    <a href="mailto:rithishjanjeerapu007@email.com">✉️ Email</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 