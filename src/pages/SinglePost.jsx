import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { postsAPI } from '../services/api'

const SinglePost = () => {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetchPost()
	}, [id])

	const fetchPost = async () => {
		try {
			setLoading(true)
			const data = await postsAPI.getPostById(id)
			setPost(data)
			setError('')
		} catch (err) {
			setError('Failed to load post. Please try again later.')
			console.error('Error fetching post:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleBuyMeACoffee = () => {
		window.open('https://buymeacoffee.com/yourusername', '_blank')
	}

	const formatDate = dateString => {
		if (!dateString) return ''
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center py-12 pt-16 pb-24 md:pt-24 md:pb-8'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500'></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='text-center py-12 pt-16 pb-24 md:pt-24 md:pb-8'>
				<p className='text-red-600 text-lg mb-4'>{error}</p>
				<div className='space-x-4'>
					<Button onClick={fetchPost} variant='primary'>
						Try Again
					</Button>
					<Link to='/'>
						<Button variant='outline'>Back to Posts</Button>
					</Link>
				</div>
			</div>
		)
	}

	if (!post) {
		return (
			<div className='text-center py-12 pt-16 pb-24 md:pt-24 md:pb-8'>
				<p className='text-gray-500 text-lg mb-4'>Post not found.</p>
				<Link to='/'>
					<Button variant='primary'>Back to Posts</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='max-w-4xl mx-auto space-y-8 pt-16 pb-24 md:pt-24 md:pb-8'>
			{/* Back Button */}
			<div>
				<Link to='/'>
					<Button variant='ghost' className='mb-4'>
						← Back to Posts
					</Button>
				</Link>
			</div>

			{/* Post Header */}
			<article className='bg-white rounded-lg shadow-lg overflow-hidden'>
				{post.image && (
					<div className='w-full h-64 md:h-96 overflow-hidden'>
						<img
							src={post.image}
							alt={post.title}
							className='w-full h-full object-cover'
						/>
					</div>
				)}

				<div className='p-6 md:p-8'>
					<h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4'>
						{post.title}
					</h1>

					<div className='flex items-center text-gray-500 text-sm mb-6 space-x-4'>
						{post.createdAt && <span>📅 {formatDate(post.createdAt)}</span>}
						{post.author && <span>👤 {post.author}</span>}
					</div>

					{post.description && (
						<p className='text-lg text-gray-600 mb-8 leading-relaxed'>
							{post.description}
						</p>
					)}

					<div
						className='prose prose-lg max-w-none text-gray-700 leading-relaxed'
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>

					<div className='mt-12 pt-8 border-t border-gray-200 text-center'>
						<h3 className='text-xl font-semibold text-gray-900 mb-4'>
							Enjoyed this post?
						</h3>
						<p className='text-gray-600 mb-6'>
							If you found value in this content, consider supporting the blog
							with a coffee!
						</p>
						<Button
							onClick={handleBuyMeACoffee}
							variant='outline'
							size='lg'
							className='bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-0 hover:opacity-90'
						>
							☕ Buy Me a Coffee
						</Button>
					</div>
				</div>
			</article>

			<div className='flex justify-between items-center pt-8'>
				<Link to='/'>
					<Button variant='outline'>← All Posts</Button>
				</Link>
				<Link to='/about'>
					<Button variant='ghost'>About the Blog →</Button>
				</Link>
			</div>
		</div>
	)
}

export default SinglePost
