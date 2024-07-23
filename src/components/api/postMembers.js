import axios from "axios";
import { BASE_URL } from "../constants";

export const postMembers = async (params, payload) => {
  return await axios.post(BASE_URL + params, payload, {
    headers: { "Content-Type": "application/json" },
  });
};