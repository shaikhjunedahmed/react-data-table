import axios from "axios"; // 
import { BASE_URL } from "../constants"; // Import the base URL from constants

// Function to delete a member by sending a DELETE request to the API
export const deleteMembers = async (params) => {
  return await axios.delete(BASE_URL + params); // Make DELETE request to API and return the response
};
