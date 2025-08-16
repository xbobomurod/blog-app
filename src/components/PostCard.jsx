import { format } from 'date-fns'
import { Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const PostCard = ({ post }) => {
	const [copied, setCopied] = useState(false)

	const truncateContent = (text, maxLength = 160) => {
		if (!text) return ''
		const plainText = text.replace(/<[^>]+>/g, '')
		return plainText.length <= maxLength
			? plainText
			: plainText.substring(0, maxLength) + '...'
	}

	const handleShare = () => {
		const postUrl = `${window.location.origin}/post/${post._id}`
		navigator.clipboard.writeText(postUrl)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const formattedDate = post.createdAt
		? format(new Date(post.createdAt), 'MMM dd, yyyy')
		: ''

	return (
		<article className='bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col h-full mx-auto max-w-6xl'>
			<div className='relative overflow-hidden aspect-video'>
				<img
					src={
						post.image || 'https://via.placeholder.com/400x225?text=No+Image'
					}
					alt={post.title}
					className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
			</div>

			<div className='p-5 flex flex-col flex-grow'>
				<div className='flex justify-between items-start mb-3'>
					<h2 className='text-xl md:text-2xl font-bold text-gray-900 line-clamp-2'>
						{post.title}
					</h2>
					<p className='text-gray-500 text-sm md:text-base'>{formattedDate}</p>
				</div>

				<p className='text-gray-700 text-sm md:text-lg leading-relaxed mb-4 flex-grow'>
					<span
						className='prose prose-sm max-w-none'
						dangerouslySetInnerHTML={{
							__html: truncateContent(post.content, 160).replace(
								/(https?:\/\/[^\s]+)/g,
								'<a href="$1" target="_blank" class="text-blue-600 underline hover:text-blue-800">$1</a>'
							),
						}}
					/>
				</p>

				<div className='flex gap-2 items-center'>
					{/* Direct Link instead of Button wrapper */}
					<Button
						as={Link}
						to={`/post/${post._id}`} // to'g'ri yo'l
						variant='primary'
						size='md'
					>
						Read More
					</Button>

					<div className='relative flex items-center'>
						<Button onClick={handleShare} variant='outline' size='md'>
							<Share2 /> Share
						</Button>
						{copied && (
							<span className='absolute -right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded'>
								Copied!
							</span>
						)}
					</div>
				</div>
			</div>
		</article>
	)
}

export default PostCard
