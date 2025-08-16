import { Coffee } from 'lucide-react'
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
			const res = await postsAPI.getAllPosts()
			const postsData = res.data || []
			setPosts(Array.isArray(postsData) ? postsData : [])
			setError('')
		} catch (err) {
			console.error('Error fetching posts:', err)
			setError('Failed to load posts. Please try again later.')
		} finally {
			setLoading(false)
		}
	}

	const handleBuyMeACoffee = () => {
		window.open('https://tirikchilik.uz/ixlosbek_erkinov', '_blank')
	}

	return (
		<div className='space-y-8 pt-16 md:pt-24 pb-24 md:pb-8 max-w-4xl mx-auto px-4'>
			{/* Header Section */}
		<div className='bg-blue-50 md:bg-blue-100 py-12 px-6 md:px-12 rounded-2xl max-w-6xl mx-auto text-center'>
	<h1 className='text-4xl md:text-5xl font-bold text-blue-800'>
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
			{!loading && error && (
				<div className='text-center py-12'>
					<p className='text-red-600 text-lg mb-4'>{error}</p>
					<Button onClick={fetchPosts} variant='primary'>
						Qayta urinib ko‘rish
					</Button>
				</div>
			)}

			{/* Posts Grid */}
			{!loading &&
				!error &&
				(posts.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-gray-500 text-lg'>
							Hozircha postlar qidirib topilmadi!
						</p>
					</div>
				) : (
					<div className='flex flex-col space-y-4'>
						{' '}
						{/* space-y-4 bilan bo‘shliqni kamaytirdik */}
						{posts.map(post => (
							<PostCard
								key={post._id}
								post={post}
								buttonVariant='primary'
								className='p-4 md:p-3' // paddingni kichraytirdik
							/>
						))}
					</div>
				))}

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
						className='flex items-center gap-2 bg-gradient-to-r from-[#6f4e37] via-[#a67c52] to-[#d2b48c] text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all'
						size='lg'
					>
						<Coffee /> Buy Me a Coffee
					</Button>
				</div>
			)}
		</div>
	)
}

export default Home
