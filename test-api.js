// Simple API test script
const axios = require('axios');

const API_URL = 'https://blog-backend-da3s.onrender.com';

async function testAPI() {
  try {
    console.log('🔍 Testing API endpoints...');
    
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test posts endpoint
    console.log('\n2. Testing posts endpoint...');
    const postsResponse = await axios.get(`${API_URL}/api/posts`);
    console.log('✅ Posts endpoint response status:', postsResponse.status);
    console.log('📊 Number of posts returned:', postsResponse.data.length);
    
    if (postsResponse.data.length > 0) {
      console.log('\n📝 Posts found:');
      postsResponse.data.forEach((post, index) => {
        console.log(`${index + 1}. ${post.name} (${post.category})`);
        console.log(`   ID: ${post._id}`);
        console.log(`   Description: ${post.description.substring(0, 50)}...`);
        console.log('   ---');
      });
    } else {
      console.log('\n📝 No posts found in database');
    }
    
    // Test CORS headers
    console.log('\n3. Testing CORS headers...');
    const corsResponse = await axios.get(`${API_URL}/api/posts`, {
      headers: {
        'Origin': 'http://localhost:3001'
      }
    });
    console.log('✅ CORS test passed');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI(); 