import { useState, useEffect } from 'react'
import { postsAPI } from '../services/api'
import Button from '../components/Button'
import Input from '../components/Input'
import RichTextEditor from '../components/RichTextEditor'
import ImageUploader from '../components/ImageUploader'

const Admin = () => {
  // State management
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: ''
  })
  const [formErrors, setFormErrors] = useState({})

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts()
  }, [])

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postsAPI.getAllPosts()
      setPosts(data)
      setError('')
    } catch (err) {
      setError('Failed to load posts. Please try again later.')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      image: ''
    })
    setFormErrors({})
    setIsEditing(false)
    setCurrentPost(null)
  }

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  // Handle image upload
  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }))
  }

  // Validate form
  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) errors.title = 'Title is required'
    if (!formData.content.trim()) errors.content = 'Content is required'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      if (isEditing) {
        await postsAPI.updatePost(currentPost.id, formData)
        setError('')
      } else {
        await postsAPI.createPost(formData)
        setError('')
      }
      
      resetForm()
      fetchPosts() // Refresh posts list
    } catch (err) {
      setError(isEditing ? 'Failed to update post.' : 'Failed to create post.')
      console.error('Error saving post:', err)
    }
  }

  // Handle edit post
  const handleEdit = (post) => {
    setCurrentPost(post)
    setFormData({
      title: post.title || '',
      description: post.description || '',
      content: post.content || '',
      image: post.image || ''
    })
    setIsEditing(true)
    setFormErrors({})
  }

  // Handle delete post
  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      await postsAPI.deletePost(postId)
      fetchPosts() // Refresh posts list
      setError('')
    } catch (err) {
      setError('Failed to delete post.')
      console.error('Error deleting post:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Admin Panel
        </h1>
        <p className="text-lg text-gray-600">
          Manage your blog posts - create, edit, and delete content
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter post title"
            error={formErrors.title}
            required
          />

          {/* Description */}
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter post description (optional)"
            error={formErrors.description}
          />

          {/* Image Upload */}
          <ImageUploader
            onImageUpload={handleImageUpload}
            currentImage={formData.image}
          />

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => handleInputChange('content', value)}
              placeholder="Write your post content here..."
            />
            {formErrors.content && (
              <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
            >
              {isEditing ? 'Update Post' : 'Create Post'}
            </Button>
            
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={resetForm}
                className="flex-1"
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Manage Posts
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-gray-600 text-sm mb-2">
                        {post.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {post.createdAt && (
                        <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                      )}
                      {post.updatedAt && (
                        <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      onClick={() => handleEdit(post)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
