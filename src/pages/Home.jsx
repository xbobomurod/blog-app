import { useEffect, useState } from 'react'
import Button from '../components/Button'
import PostCard from '../components/PostCard'
import { postsAPI } from '../services/api'

const Home = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetchPosts()
	}, [])

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

	const handleBuyMeACoffee = () => {
		window.open('https://tirikchilik.uz/ixlosbek_erkinov', '_blank')
	}

	return (
		<div className='space-y-8 pt-16 md:pt-24 pb-24 md:pb-8'>
			{/* Header Section */}
			<div className='text-center space-y-4'>
				<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent'>
					Postlar
				</h1>
			</div>

			{/* Loading State */}
			{loading && (
				<div className='flex justify-center items-center py-12'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500'></div>
				</div>
			)}

			{/* Error State */}
			{error && (
				<div className='text-center py-12'>
					<p className='text-red-600 text-lg mb-4'>{error}</p>
					<Button onClick={fetchPosts} variant='primary'>
						Qayta urinib ko‘rish
					</Button>
				</div>
			)}

			{/* Posts Grid */}
			{!loading && !error && (
				<>
					{posts.length === 0 ? (
						<div className='text-center py-12'>
							<p className='text-gray-500 text-lg'>
								Hozircha postlar qidirib topilmadi!
							</p>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{posts.map(post => (
								<PostCard key={post.id} post={post} />
							))}
						</div>
					)}
				</>
			)}

			{/* Bottom Buy Me a Coffee Section */}
			{!loading && posts.length > 0 && (
				<div className='text-center py-12 border-t border-gray-200'>
					<h3 className='text-2xl font-semibold text-gray-900 mb-4'>
						Blogni qo‘llab-quvvatlash
					</h3>
					<p className='text-gray-600 mb-6 max-w-md mx-auto'>
						Agar siz ushbu blogni yoqtirsangiz va uni qo‘llab-quvvatlamoqchi
						bo‘lsangiz, Buy Me a Coffee orqali yordam bera olasiz.
					</p>
					<Button
						onClick={handleBuyMeACoffee}
						variant='outline'
						size='lg'
						className='bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white border-0 hover:opacity-90'
					>
						☕ Buy Me a Coffee
					</Button>
				</div>
			)}
		</div>
	)
}

export default Home
