import { useState, useEffect } from 'react'
import { postsAPI } from '../services/api'
import PostCard from '../components/PostCard'
import Button from '../components/Button'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts()
  }, [])

  

  // Fetch posts from API
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

  // Handle "Buy Me a Coffee" click
  const handleBuyMeACoffee = () => {
    // You can replace this with your actual Buy Me a Coffee link
    window.open('https://buymeacoffee.com/yourusername', '_blank')
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Posts
        </h1>
     
        
     
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Button onClick={fetchPosts} variant="primary">
            Try Again
          </Button>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && !error && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Bottom Buy Me a Coffee Section */}
      {!loading && posts.length > 0 && (
        <div className="text-center py-12 border-t border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Enjoyed the content?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            If you found value in these posts, consider supporting the blog with a coffee!
          </p>
          <Button
            onClick={handleBuyMeACoffee}
            variant="outline"
            size="lg"
            className="bg-yellow-50 border-yellow-400 text-yellow-700 hover:bg-yellow-100"
          >
            ☕ Buy Me a Coffee
          </Button>
        </div>
      )}
    </div>
  )
}

export default Home
