# Deploy to Render

## Prerequisites
1. Create a Render account at https://render.com
2. Set up a MongoDB database (MongoDB Atlas recommended)
3. Get an Eden AI API key

## Environment Variables Setup

### Backend Environment Variables
Set these in your Render backend service:
- `MONGODB_URI`: Your MongoDB connection string
- `EDEN_API_KEY`: Your Eden AI API key
- `NODE_ENV`: Set to "production"
- `PORT`: Set to 10000

### Frontend Environment Variables
Set these in your Render frontend service:
- `REACT_APP_API_URL`: Your backend service URL (e.g., https://your-backend-name.onrender.com)

## Deployment Steps

### Option 1: Using render.yaml (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Render will automatically detect the `render.yaml` file and create both services

### Option 2: Manual Setup
1. Create a new Web Service for the backend
2. Create a new Static Site for the frontend
3. Configure the build and start commands as specified in `render.yaml`

## Build Commands

### Backend
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && node blog.js`

### Frontend
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

## Important Notes
- The backend will serve the React app in production
- Make sure your MongoDB database is accessible from Render
- The frontend will make API calls to the backend service
- CORS is enabled for cross-origin requests

## Troubleshooting
- Check Render logs for build errors
- Verify environment variables are set correctly
- Ensure MongoDB connection string is valid
- Test API endpoints using the health check: `/api/health` 