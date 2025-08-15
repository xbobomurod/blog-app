export const authAPI = {
	login: async (username, password) => {
		// Backendda oldindan berilgan admin login
		if (username === 'admin' && password === '123456') {
			localStorage.setItem('token', 'fake-jwt-token')
			return { success: true }
		}
		throw new Error('Invalid username or password')
	},
	logout: () => {
		localStorage.removeItem('token')
	},
	isAuthenticated: () => {
		return !!localStorage.getItem('token')
	},
}
