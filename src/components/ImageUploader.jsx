import { useState, useRef } from 'react'
import { uploadAPI } from '../services/api'
import Button from './Button'

const ImageUploader = ({ onImageUpload, currentImage = '', className = '' }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImage)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    setError('')
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Handle image upload
  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0]
    if (!file) {
      setError('Please select an image first')
      return
    }

    setIsUploading(true)
    setError('')

    try {
      const response = await uploadAPI.uploadImage(file)
      onImageUpload(response.imageUrl || response.url)
      setError('')
    } catch (error) {
      setError('Failed to upload image. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  // Remove image
  const handleRemoveImage = () => {
    setPreviewUrl('')
    onImageUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setError('')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Upload
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full sm:w-auto"
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      )}

      {/* Upload Button for selected file */}
      {fileInputRef.current?.files[0] && !previewUrl && (
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full sm:w-auto"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      )}
    </div>
  )
}

export default ImageUploader
