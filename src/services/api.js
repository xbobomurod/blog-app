import axios from 'axios'

// Base API configuration
const API_BASE_URL = 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Posts API endpoints
export const postsAPI = {
  // Get all posts
  getAllPosts: async () => {
    try {
      const response = await api.get('/posts')
      return response.data
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  },

  // Get single post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching post:', error)
      throw error
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData)
      return response.data
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  },

  // Update post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData)
      return response.data
    } catch (error) {
      console.error('Error updating post:', error)
      throw error
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  },
}

// Upload API endpoint
export const uploadAPI = {
  // Upload image
  uploadImage: async (file) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },
}

export default api
