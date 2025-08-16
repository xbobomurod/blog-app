import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { postsAPI } from '../services/api'

const SinglePost = () => {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => fetchPost(), [id])

	const fetchPost = async () => {
		try {
			setLoading(true)
			const data = await postsAPI.getPostById(id)
			setPost(data.data || data)
			setError('')
		} catch (err) {
			console.error('Error fetching post:', err)
			setError('Postni yuklashda xatolik yuz berdi.')
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

	if (loading)
		return (
			<div className='flex justify-center items-center py-20'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500'></div>
			</div>
		)
	if (error)
		return (
			<div className='text-center py-20'>
				<p className='text-red-600 text-lg mb-4'>{error}</p>
				<Link to='/'>
					<Button variant='primary'>Back to Posts</Button>
				</Link>
			</div>
		)
	if (!post)
		return (
			<div className='text-center py-20'>
				<p className='text-gray-500 text-lg mb-4'>Post topilmadi.</p>
				<Link to='/'>
					<Button variant='primary'>Back to Posts</Button>
				</Link>
			</div>
		)

	return (
		<div className='max-w-4xl mx-auto px-4 pt-24 pb-24'>
			<Link to='/'>
				<Button variant='ghost' className='mb-6'>
					← Back to Posts
				</Button>
			</Link>

			<article className='bg-white rounded-2xl shadow-xl overflow-hidden'>
				{post.image && (
					<div className='w-full h-64 md:h-96 overflow-hidden'>
						<img
							src={post.image}
							alt={post.title}
							className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
						/>
					</div>
				)}

				<div className='p-6 md:p-10'>
					<h1 className='text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4'>
						{post.title}
					</h1>

					{post.createdAt && (
						<p className='text-gray-500 text-sm mb-6'>
							📅 {formatDate(post.createdAt)}
						</p>
					)}

					<div
						className='prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10'
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>

					<div className='mt-12 pt-8 border-t border-gray-200 text-center'>
						<h3 className='text-xl md:text-2xl font-semibold text-gray-900 mb-4'>
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
		</div>
	)
}

export default SinglePost
