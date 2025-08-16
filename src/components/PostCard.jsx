import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
	const truncateContent = (text, maxLength = 150) => {
		if (!text) return ''
		const plainText = text.replace(/<[^>]+>/g, '') // HTML teglarni olib tashlash
		return plainText.length <= maxLength
			? plainText
			: plainText.substring(0, maxLength) + '...'
	}

	return (
		<article className='bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full'>
			{/* Post Image */}
			<div className='relative overflow-hidden aspect-video group'>
				<img
					src={
						post.image || 'https://via.placeholder.com/400x225?text=No+Image'
					}
					alt={post.title}
					className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
			</div>

			{/* Post Content */}
			<div className='p-6 flex flex-col flex-grow'>
				<h2 className='text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2'>
					{post.title}
				</h2>

				<p className='text-gray-700 text-sm md:text-base leading-relaxed mb-4 flex-grow'>
					{truncateContent(post.content, 180)}
				</p>

				{/* Read More Link */}
				<Link
					to={`/post/${post._id}`}
					className='inline-flex items-center justify-center w-max px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm md:text-base font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105'
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
