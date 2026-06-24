import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`,
  );

  return response.data.articles;
};
