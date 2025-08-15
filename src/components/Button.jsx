const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	className = '',
	disabled = false,
	onClick,
	type = 'button',
	...props
}) => {
	const baseClasses =
		'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'

	const variantClasses = {
		primary:
			'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl focus:ring-sky-400',
		secondary:
			'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
		danger:
			'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg focus:ring-red-400',
		success:
			'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg focus:ring-green-400',
		outline:
			'border-2 border-sky-600 text-sky-600 hover:bg-sky-50 focus:ring-sky-500',
		ghost: 'text-sky-600 hover:bg-sky-50 focus:ring-sky-500',
	}

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
		xl: 'px-8 py-4 text-lg',
	}

	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

	return (
		<button
			type={type}
			className={classes}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
