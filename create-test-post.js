// Script to create a test post and verify it appears on frontend
const axios = require('axios');

const API_URL = 'https://blog-backend-da3s.onrender.com';

const testPost = {
  name: "My First Blog Post",
  description: "This is my first blog post created to test the complete flow from database to frontend. I'm excited to share my thoughts and experiences with you all. This post will help us verify that the blog application is working correctly.",
  category: "Personal"
};

async function createTestPost() {
  try {
    console.log('🔍 Creating test post...');
    console.log('Post data:', testPost);
    
    // Create the post
    const createResponse = await axios.post(`${API_URL}/api/posts`, testPost);
    console.log('✅ Post created successfully!');
    console.log('Created post ID:', createResponse.data._id);
    console.log('Created post:', createResponse.data.name);
    
    // Wait a moment for the database to update
    console.log('\n⏳ Waiting 2 seconds for database to update...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Fetch all posts to verify
    console.log('\n🔍 Fetching all posts to verify...');
    const fetchResponse = await axios.get(`${API_URL}/api/posts`);
    console.log('📊 Total posts in database:', fetchResponse.data.length);
    
    if (fetchResponse.data.length > 0) {
      console.log('\n📝 Posts in database:');
      fetchResponse.data.forEach((post, index) => {
        console.log(`${index + 1}. ${post.name} (${post.category})`);
        console.log(`   ID: ${post._id}`);
      });
    }
    
    console.log('\n🎉 Test completed!');
    console.log('Now check your frontend at http://localhost:3001 to see if the post appears.');
    
  } catch (error) {
    console.error('❌ Error creating test post:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

createTestPost(); 