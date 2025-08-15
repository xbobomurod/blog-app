export const authAPI = {
  login: async (email, password) => {
    if (email === "my@gmail.com" && password === "123456") {
      localStorage.setItem("token", "fake-jwt-token");
      return { success: true };
    }
    throw new Error("Invalid email or password");
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};
