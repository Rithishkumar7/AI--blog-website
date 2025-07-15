// Script to test MongoDB connection and collection creation
const mongoose = require('mongoose');

// Test MongoDB connection
async function testMongoDB() {
  console.log('🔍 Testing MongoDB connection...');
  
  // Check if MONGODB_URI is available
  const MONGODB_URI = process.env.MONGODB_URI;
  console.log('MONGODB_URI available:', !!MONGODB_URI);
  
  if (!MONGODB_URI) {
    console.log('❌ No MONGODB_URI found in environment variables');
    console.log('Please check your .env file or environment variables');
    return;
  }
  
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    
    console.log('✅ Connected to MongoDB successfully!');
    
    // Get database info
    const db = mongoose.connection.db;
    console.log('Database name:', db.databaseName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📚 Collections in database:');
    if (collections.length === 0) {
      console.log('No collections found');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
    
    // Check if 'posts' collection exists
    const postsCollection = collections.find(c => c.name === 'posts');
    if (postsCollection) {
      console.log('\n✅ Posts collection exists');
      
      // Count documents in posts collection
      const count = await db.collection('posts').countDocuments();
      console.log(`📊 Number of posts: ${count}`);
      
      if (count > 0) {
        // Show sample posts
        const samplePosts = await db.collection('posts').find().limit(3).toArray();
        console.log('\n📝 Sample posts:');
        samplePosts.forEach((post, index) => {
          console.log(`${index + 1}. ${post.name} (${post.category})`);
        });
      }
    } else {
      console.log('\n❌ Posts collection does not exist');
      console.log('The collection will be created when the first post is added');
    }
    
    // Test creating a sample post
    console.log('\n🧪 Testing post creation...');
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
    
    const testPost = new Post({
      name: 'Test Post',
      description: 'This is a test post to verify collection creation',
      category: 'Technical'
    });
    
    await testPost.save();
    console.log('✅ Test post created successfully');
    
    // Verify the post was saved
    const savedPost = await Post.findById(testPost._id);
    console.log('✅ Post retrieved from database:', savedPost.name);
    
    // Clean up - delete the test post
    await Post.findByIdAndDelete(testPost._id);
    console.log('✅ Test post cleaned up');
    
    // Final collection check
    const finalCollections = await db.listCollections().toArray();
    console.log('\n📚 Final collections:');
    finalCollections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Full error:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

testMongoDB(); 