import { Coffee, Home, Info } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
	const location = useLocation()

	const navItems = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/about', label: 'About', icon: Info },
	]

	const isActive = path => location.pathname === path

	const handleBuyMeACoffee = () => {
		window.open('https://buymeacoffee.com/yourusername', '_blank')
	}

	// Reusable gradient styles
	const gradientText =
		'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
	const gradientBg =
		'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white'

	return (
		<>
			{/* MOBILE TOP LOGO */}
			<header
				className={`md:hidden fixed top-0 left-0 w-full ${gradientBg} font-bold text-xl text-center py-3 shadow-lg z-50`}
			>
				IxlosWare
			</header>

			{/* MOBILE BOTTOM NAVBAR */}
			<div className='fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200 rounded-full flex justify-around items-center py-2 px-3 md:hidden z-50'>
				{navItems.map(item => {
					const active = isActive(item.path)
					const Icon = item.icon
					return (
						<Link
							key={item.path}
							to={item.path}
							className={`flex flex-col items-center text-xs transition-all ${
								active
									? 'text-pink-500 font-semibold'
									: 'text-gray-500 hover:text-pink-500'
							}`}
						>
							<Icon size={20} />
							<span>{item.label}</span>
						</Link>
					)
				})}
				<button
					onClick={handleBuyMeACoffee}
					className='flex flex-col items-center text-xs text-yellow-600 hover:text-yellow-700 transition-all'
				>
					<Coffee size={20} />
					Coffee
				</button>
			</div>

			{/* DESKTOP NAVBAR */}
			<nav className='hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 rounded-full px-6 py-3 items-center justify-between z-50'>
				{/* Left: Logo */}
				<Link to='/' className={`text-xl font-extrabold ${gradientText}`}>
					IxlosWare
				</Link>

				{/* Right: Menu */}
				<div className='flex items-center space-x-4'>
					{navItems.map(item => {
						const active = isActive(item.path)
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
									active
										? `${gradientBg} shadow-md`
										: `text-gray-700 hover:${gradientText}`
								}`}
							>
								{item.label}
							</Link>
						)
					})}
					<Button
						onClick={handleBuyMeACoffee}
						variant='outline'
						size='sm'
						className={`border-0 ${gradientBg} hover:opacity-90 rounded-full px-4`}
					>
						☕ Buy Me a Coffee
					</Button>
				</div>
			</nav>
		</>
	)
}

export default Navbar
