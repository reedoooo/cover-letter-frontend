import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const generateCoverLetter = async (formData) => {
  return await axios.post(`${API_BASE_URL}/generate-cover-letter`, formData);
};
