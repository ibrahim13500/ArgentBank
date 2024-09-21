import axios from "axios";

/**
 * Function to retrieve user information.
 * @param {string | null} token - User authentication token.
 * @returns {Promise<Object>} Object containing user information.
 */
export const getUser = async (token) => {
  const response = await axios.post(
    "http://localhost:3001/api/v1/user/profile",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
