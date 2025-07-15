// Script to delete the test post created earlier
const axios = require('axios');

const API_URL = 'https://blog-backend-da3s.onrender.com';
const POST_ID = '6872a93d9cbcdb9b61cf74b6'; // The post ID from the test

async function deleteTestPost() {
  try {
    console.log('🔍 Deleting test post...');
    console.log('Post ID:', POST_ID);
    
    // First, let's verify the post exists
    console.log('\n📋 Verifying post exists...');
    const getResponse = await axios.get(`${API_URL}/api/posts/${POST_ID}`);
    console.log('✅ Post found:', getResponse.data.name);
    console.log('Description:', getResponse.data.description.substring(0, 50) + '...');
    
    // Delete the post
    console.log('\n🗑️ Deleting post...');
    const deleteResponse = await axios.delete(`${API_URL}/api/posts/${POST_ID}`);
    console.log('✅ Post deleted successfully!');
    console.log('Deleted post:', deleteResponse.data.deletedPost.name);
    
    // Verify the post is gone
    console.log('\n🔍 Verifying post is deleted...');
    try {
      await axios.get(`${API_URL}/api/posts/${POST_ID}`);
      console.log('❌ Post still exists - deletion may have failed');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('✅ Post successfully deleted (404 Not Found)');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }
    
    // Check total posts count
    console.log('\n📊 Checking total posts count...');
    const postsResponse = await axios.get(`${API_URL}/api/posts`);
    console.log('Total posts remaining:', postsResponse.data.length);
    
    if (postsResponse.data.length === 0) {
      console.log('✅ Database is now empty');
    } else {
      console.log('📝 Remaining posts:');
      postsResponse.data.forEach((post, index) => {
        console.log(`${index + 1}. ${post.name} (${post.category})`);
        console.log(`   ID: ${post._id}`);
      });
    }
    
    console.log('\n🎉 Test post deletion completed!');
    
  } catch (error) {
    console.error('❌ Error deleting test post:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

deleteTestPost(); 