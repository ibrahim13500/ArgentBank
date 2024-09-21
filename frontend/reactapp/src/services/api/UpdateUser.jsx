import axios from "axios";

/**
 * Function to update user profile information.
 * @param {string} editFirstName - Updated first name.
 * @param {string} editLastName - Updated last name.
 * @param {string | null} token - User authentication token.
 * @returns {Promise<Object>} Object containing update information.
 */
export const updateUser = async (editFirstName, editLastName, token) => {
  const response = await axios.put(
    "http://localhost:3001/api/v1/user/profile",
    {
      firstName: editFirstName,
      lastName: editLastName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
