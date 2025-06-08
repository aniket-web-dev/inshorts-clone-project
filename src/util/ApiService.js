// src/utils/ApiService.js
import axios from "axios";

const BASE_URL = "/api/en/news";

export const fetchNewsFromAPI = async (offset = "") => {
  const url = `${BASE_URL}?category=top_stories&max_limit=10&include_card_data=true&news_offset=${offset}`;
  const response = await axios.get(url);
  return response.data;
};
