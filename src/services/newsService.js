import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async () => {
  const response = await axios.get(
    `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=us&language=en`,
  );

  return response.data.results;
};
