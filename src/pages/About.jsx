import { Globe, Phone } from 'lucide-react'
import Button from '../components/Button'

const About = () => {
	// Handle portfolio link click
	const handlePortfolioClick = url => {
		window.open(url, '_blank')
	}

	return (
		<div className='max-w-4xl mx-auto space-y-16 pb-16 mt-20 md:mt-28'>
			{/* Hero Section */}
			<div className='text-center space-y-6'>
				<div className='w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg'>
					<span className='text-4xl text-white font-bold'>👨‍💻</span>
				</div>
				<h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
					About the Blog
				</h1>
				<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
					Welcome to our digital space where we share insights, stories, and
					knowledge.
				</p>
			</div>

			{/* Main Content */}
			<div className='grid md:grid-cols-2 gap-12 items-center'>
				<div className='space-y-6'>
					<h2 className='text-3xl font-bold text-gray-900'>Our Story</h2>
					<div className='space-y-4 text-gray-600 leading-relaxed'>
						<p>
							This blog was born from a passion for sharing knowledge and
							connecting with like-minded individuals. We believe the best way
							to learn is through sharing experiences and insights with others.
						</p>
						<p>
							Whether you're a seasoned professional or just starting your
							journey, you'll find valuable content here that can help you grow
							and succeed.
						</p>
						<p>
							We cover technology, personal development, creativity, and much
							more — all with practical, actionable advice.
						</p>
					</div>
				</div>

				<div className='bg-white rounded-lg shadow-lg p-8 space-y-4'>
					<h3 className='text-2xl font-bold text-gray-900'>What We Offer</h3>
					{[
						'In-depth articles and tutorials',
						'Practical tips and insights',
						'Real-world examples and case studies',
						'Regular updates and fresh content',
					].map((text, i) => (
						<div key={i} className='flex items-center space-x-3'>
							<div className='w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center'>
								<span className='text-pink-600 font-bold'>✓</span>
							</div>
							<span className='text-gray-700'>{text}</span>
						</div>
					))}
				</div>
			</div>

			{/* Mission Section */}
			<div className='bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center space-y-6'>
				<h2 className='text-3xl font-bold text-gray-900'>Our Mission</h2>
				<p className='text-lg text-gray-700 max-w-3xl mx-auto'>
					To inspire, educate, and empower individuals through high-quality
					content that combines practical knowledge with real-world
					applications.
				</p>
			</div>

			{/* Stats Section */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
				<div>
					<div className='text-4xl font-bold text-pink-600'>100+</div>
					<div className='text-gray-600'>Articles Published</div>
				</div>
				<div>
					<div className='text-4xl font-bold text-pink-600'>10K+</div>
					<div className='text-gray-600'>Readers Worldwide</div>
				</div>
				<div>
					<div className='text-4xl font-bold text-pink-600'>5+</div>
					<div className='text-gray-600'>Years of Experience</div>
				</div>
			</div>

			{/* Developers Section */}
			<div className='space-y-10'>
				<h2 className='text-3xl font-bold text-center text-gray-900'>
					Meet the Developers
				</h2>

				<div className='grid md:grid-cols-2 gap-8'>
					{/* Backend Developer */}
					<div className='bg-white rounded-xl shadow-lg p-6 text-center space-y-4'>
						<img
							src='https://picsum.photos/200'
							alt='Backend Developer'
							className='w-24 h-24 rounded-full mx-auto shadow-md'
						/>
						<h3 className='text-xl font-bold text-gray-900'>Ixlosbek Erkinov</h3>
						<p className='text-gray-600'>
							Backend Engineer specializing in Node.js, Express, and MongoDB.
							Loves building scalable APIs and crafting efficient database
							solutions.
						</p>
						<div className='flex gap-4 justify-center'>
							<Button
								onClick={() =>
									handlePortfolioClick('https://ixlosbek.uz')
								}
							>
								<Globe /> Portfolio
							</Button>
							<Button
								variant='outline'
								onClick={() => window.open('mailto:bekerkinov2004@gmail.com')}
							>
								<Phone /> <span> </span>Contact
							</Button>
						</div>
					</div>

					{/* Frontend Developer */}
					<div className='bg-white rounded-xl shadow-lg p-6 text-center space-y-4'>
						<img
							src='https://picsum.photos/200'
							alt='Frontend Developer'
							className='w-24 h-24 rounded-full mx-auto shadow-md'
						/>
						<h3 className='text-xl font-bold text-gray-900'>Kh Bobomurod</h3>
						<p className='text-gray-600'>
							Frontend Developer with expertise in React, Tailwind CSS, and
							modern UI/UX design principles. Passionate about creating smooth
							user experiences.
						</p>
						<div className='flex gap-4 justify-center'>
							<Button
								onClick={() =>
									handlePortfolioClick(
										'https://kh-bobomurod-s-portfolio.vercel.app/'
									)
								}
							>
								<Globe /> Portfolio
							</Button>
							<Button
								variant='outline'
								onClick={() => window.open('mailto:xbobomurod50@gmail.com')}
							>
								<Phone /> Contact
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
