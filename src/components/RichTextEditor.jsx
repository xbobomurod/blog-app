import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = ({
	value,
	onChange,
	placeholder = 'Write your content here...',
}) => {
	// Quill modules configuration
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, false] }],
			['bold', 'italic', 'underline', 'strike', 'spoiler'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ color: [] }, { background: [] }],
			[{ align: [] }],
			['link', 'image'],
			['clean'],
		],
	}

	// Quill formats configuration
	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'spoiler',
		'list',
		'bullet',
		'color',
		'background',
		'align',
		'link',
		'image',
	]

	return (
		<div className='rich-text-editor'>
			<ReactQuill
				theme='snow'
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder={placeholder}
				className='bg-white'
				style={{
					height: '300px',
					marginBottom: '50px', // Space for toolbar
				}}
			/>

			{/* Custom styles for better integration */}
			<style jsx>{`
				.rich-text-editor .ql-container {
					border-bottom-left-radius: 0.5rem;
					border-bottom-right-radius: 0.5rem;
					font-size: 16px;
				}

				.rich-text-editor .ql-toolbar {
					border-top-left-radius: 0.5rem;
					border-top-right-radius: 0.5rem;
					border-color: #d1d5db;
				}

				.rich-text-editor .ql-container {
					border-color: #d1d5db;
				}

				.rich-text-editor .ql-editor {
					min-height: 200px;
					padding: 1rem;
				}

				.rich-text-editor .ql-editor:focus {
					border-color: #3b82f6;
					box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
				}
			`}</style>
		</div>
	)
}

export default RichTextEditor
