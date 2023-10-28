import axios from "axios";

import { baseUrl } from "./Constant";
const api_key = import.meta.env.VITE_API_KEY;

export const fetchDataFromApi = async (url, filters) => {
  try {
    const params = {
      api_key,
    };
    if (filters?.with_genres) {
      params.with_genres = filters?.with_genres;
    }
    if (filters?.sort_by) {
      params.sort_by = filters?.sort_by;
    }
    const { data } = await axios.get(baseUrl + url, {
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
