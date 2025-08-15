import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
	const truncateDescription = (text, maxLength = 150) => {
		if (!text) return ''
		return text.length <= maxLength
			? text
			: text.substring(0, maxLength) + '...'
	}

	return (
		<article className='bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
			{/* Post Image */}
			<div className='aspect-video overflow-hidden relative group'>
				<img
					src={
						post.image || 'https://via.placeholder.com/400x225?text=No+Image'
					}
					alt={post.title}
					className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
				/>
				{/* Overlay gradient on hover */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
			</div>

			{/* Post Content */}
			<div className='p-6 flex flex-col h-full'>
				<h2 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2'>
					{post.title}
				</h2>

				<p className='text-gray-600 text-sm leading-relaxed mb-6 flex-grow'>
					{truncateDescription(post.description || post.content)}
				</p>

				{/* Read More Link styled as button */}
				<Link
					to={`/post/${post.id}`}
					className='inline-flex items-center justify-center w-max px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105'
				>
					Read More
					<svg
						className='ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</Link>
			</div>
		</article>
	)
}

export default PostCard
