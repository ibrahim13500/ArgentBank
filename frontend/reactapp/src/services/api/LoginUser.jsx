import axios from "axios";

/**
 * Function to authenticate a user.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} Object containing authentication information.
 */
 const loginUser = async (email, password) => {
  const response = await axios.post("http://localhost:3001/api/v1/user/login", {
    email: email,
    password: password,
  });

  return response.data;
};
export default loginUser;
