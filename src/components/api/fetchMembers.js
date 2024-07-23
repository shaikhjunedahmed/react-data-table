import axios from "axios";
import { BASE_URL } from "../constants";

export const fetchMembers = async (params) => {
  return await axios.get(BASE_URL + params);
};
