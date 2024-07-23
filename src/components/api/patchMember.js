import axios from "axios";
import { BASE_URL } from "../constants";

export const patchMembers = async (params, payload) => {
  return await axios.put(BASE_URL + params, payload, {
    headers: { "Content-Type": "application/json" },
  });
};
