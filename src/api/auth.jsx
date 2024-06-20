import axios from 'axios';
import constants from 'config/constants';

const { API_URL } = constants;

export const authAPI = {
  async handleAuthSubmit(values) {
    const { username, password, email, isSignup } = values;
    const url = isSignup ? `${API_URL}/user/signup` : `${API_URL}/user/login`;
    const usernameOrEmail = !email ? username : email;
    const payload = isSignup
      ? { username, password, email }
      : { usernameOrEmail, password };

    try {
      const { data } = await axios.post(url, payload);
      return data;
    } catch (error) {
      console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
      throw error;
    }
  },

  async validateToken(token) {
    try {
      const response = await axios.get(`${API_URL}/user/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  },

  async logout(token) {
    try {
      await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};
