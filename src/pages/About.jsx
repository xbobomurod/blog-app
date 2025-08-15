import Button from '../components/Button'

const About = () => {
  // Handle portfolio link click
  const handlePortfolioClick = () => {
    // Replace with your actual portfolio URL
    window.open('https://yourportfolio.com', '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <span className="text-4xl text-white font-bold">👨‍💻</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About the Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Welcome to our digital space where we share insights, stories, and knowledge
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Story */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              This blog was born from a passion for sharing knowledge and connecting with 
              like-minded individuals. We believe that the best way to learn is through 
              sharing experiences and insights with others.
            </p>
            <p>
              Whether you're a seasoned professional or just starting your journey, 
              you'll find valuable content here that can help you grow and succeed 
              in your endeavors.
            </p>
            <p>
              We cover a wide range of topics including technology, personal development, 
              creativity, and much more. Our goal is to provide practical, actionable 
              content that makes a real difference in your life.
            </p>
          </div>
        </div>

        {/* Right Column - Stats/Features */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What We Offer
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">✓</span>
                </div>
                <span className="text-gray-700">In-depth articles and tutorials</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">✓</span>
                </div>
                <span className="text-gray-700">Practical tips and insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">✓</span>
                </div>
                <span className="text-gray-700">Real-world examples and case studies</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">✓</span>
                </div>
                <span className="text-gray-700">Regular updates and fresh content</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            To inspire, educate, and empower individuals through high-quality content 
            that combines practical knowledge with real-world applications. We believe 
            that everyone has the potential to achieve great things, and we're here 
            to help you unlock that potential.
          </p>
        </div>
      </div>

      {/* Contact/Portfolio Section */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Let's Connect
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Want to see more of my work or get in touch? Check out my portfolio 
          and let's start a conversation!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handlePortfolioClick}
            variant="primary"
            size="lg"
          >
            🎨 My Portfolio
          </Button>
          <Button
            onClick={() => window.open('mailto:hello@example.com', '_blank')}
            variant="outline"
            size="lg"
          >
            📧 Get in Touch
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-primary-600">100+</div>
          <div className="text-gray-600">Articles Published</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-primary-600">10K+</div>
          <div className="text-gray-600">Readers Worldwide</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-primary-600">5+</div>
          <div className="text-gray-600">Years of Experience</div>
        </div>
      </div>
    </div>
  )
}

export default About
