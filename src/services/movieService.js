import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getMoviesByGenre = async (genreId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie`,
    {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
      },
    },
  );

  return response.data.results.slice(0, 4);
};
