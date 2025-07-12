require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

// Middleware
app.use(cors({
  origin: ['https://blog-frontend-lnvm.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const MONGODB_URI = process.env.MONGODB_URI;
const EDEN_API_KEY = process.env.EDEN_API_KEY;

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const postSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: {
    type: String,
    enum: ['Technical', 'Personal', 'Travel', 'Food', 'Lifestyle', 'Business', 'Education', 'Other'],
    default: 'Other'
  }
});
const Post = mongoose.model('Post', postSchema);

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single post
app.get('/api/posts/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).exec();
    if (post) res.json(post);
    else res.status(404).json({ error: "Post not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a post
app.post('/api/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: "Failed to create post" });
  }
});

// AI generate (already suitable, just update route)
app.post('/api/ai-generate', async (req, res) => {
  const topic = req.body.topic;
  if (!topic) {
    return res.status(400).json({ error: 'No topic provided' });
  }
  try {
    const response = await axios.post(
      'https://api.edenai.run/v2/text/generation',
      {
        providers: "openai",
        text: `Write a beautiful, detailed blog post about: ${topic}`,
        temperature: 0.7,
        max_tokens: 700,
        fallback_providers: ""
      },
      {
        headers: {
          'Authorization': `Bearer ${EDEN_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const aiText = response.data.openai.generated_text;
    res.json({ text: aiText });
  } catch (err) {
    console.error('Eden AI error:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: ' Failed to generate blog post-not have enough credits to perform this operation' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server started on port ${PORT}`);
});