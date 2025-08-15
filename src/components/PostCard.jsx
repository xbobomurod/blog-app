import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  // Truncate description for preview
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Post Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image || 'https://via.placeholder.com/400x225?text=No+Image'}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Post Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {truncateDescription(post.description || post.content)}
        </p>
        
        {/* Read More Link */}
        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
        >
          Read More
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default PostCard
