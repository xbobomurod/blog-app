// pages/Admin.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ImageUploader from '../components/ImageUploader'
import Input from '../components/Input'
import RichTextEditor from '../components/RichTextEditor'
import { postsAPI } from '../services/api'
import { authAPI } from '../services/authAPI'

const Admin = () => {
	const navigate = useNavigate()
	const [posts, setPosts] = useState([])
	const [form, setForm] = useState({
		title: '',
		description: '',
		content: '',
		image: '',
	})
	const [editing, setEditing] = useState(null)

	useEffect(() => {
		fetchPosts()
	}, [])

	const fetchPosts = async () => {
		const data = await postsAPI.getAllPosts()
		setPosts(data)
	}

	const handleLogout = () => {
		authAPI.logout()
		navigate('/login')
	}

	return (
		<div className='max-w-6xl mx-auto py-8 px-4 mt-6'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent'>
					Admin Panel
				</h1>
				<Button variant='danger' onClick={handleLogout}>
					Logout
				</Button>
			</div>

			{/* Form */}
			<div className='bg-white p-6 rounded-xl shadow-lg mb-8'>
				<h2 className='text-2xl font-bold mb-4'>
					{editing ? 'Edit Post' : 'Create Post'}
				</h2>
				<Input
					label='Title'
					value={form.title}
					onChange={e => setForm({ ...form, title: e.target.value })}
				/>
				<Input
					label='Description'
					value={form.description}
					onChange={e => setForm({ ...form, description: e.target.value })}
				/>
				<ImageUploader
					onImageUpload={url => setForm({ ...form, image: url })}
					currentImage={form.image}
				/>
				<RichTextEditor
					value={form.content}
					onChange={value => setForm({ ...form, content: value })}
				/>
				<div className='mt-4'>
					<Button variant='primary'>{editing ? 'Update' : 'Create'}</Button>
				</div>
			</div>

			{/* Posts */}
			<div className='grid gap-4'>
				{posts.map(post => (
					<div
						key={post.id}
						className='p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all hover:scale-[1.01]'
					>
						<h3 className='font-semibold text-lg'>{post.title}</h3>
						<p className='text-gray-600'>{post.description}</p>
						<div className='mt-2 flex gap-2'>
							<Button variant='outline' size='sm'>
								Edit
							</Button>
							<Button variant='danger' size='sm'>
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Admin
