import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import { getMoviesByGenre } from "../services/movieService";
import profile from "../assets/images/profile.png";

const genreMap = {
  Action: 28,
  Drama: 18,
  Romance: 10749,
  Thriller: 53,
  Western: 37,
  Horror: 27,
  Fantasy: 14,
  Music: 10402,
  Fiction: 878,
};

const Movies = () => {
  const selectedCategories = useStore((state) => state.selectedCategories);
  const navigate = useNavigate();

  const [movies, setMovies] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = {};

      for (const category of selectedCategories) {
        const genreId = genreMap[category];

        const data = await getMoviesByGenre(genreId);

        movieData[category] = data;
      }

      setMovies(movieData);
    };

    fetchMovies();
  }, [selectedCategories]);

  return (
    <div className="min-h-screen bg-black text-white px-5 sm:px-8 py-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1
          onClick={() => navigate("/categories")}
          className="text-[#72DB73] text-4xl sm:text-3xl cursor-pointer"
          style={{ fontFamily: "Single Day" }}
        >
          Super app
        </h1>

        <img
          src={profile}
          alt="profile"
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>

      {/* Title */}
      <h2 className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 pl-2 sm:pl-4">
        Entertainment according to your choice
      </h2>

      {/* Categories */}
      <div className="flex flex-col gap-8 sm:gap-10 pl-2 sm:pl-4">
        {selectedCategories.map((category) => (
          <div key={category}>
            <h3 className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
              {category}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
              {movies[category]?.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative aspect-16/10 w-full overflow-hidden rounded-xl bg-[#1a1a1a] shadow-lg shadow-black/40 transition-transform duration-200 ease-out hover:scale-[1.04] cursor-pointer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-2">
                    {movie.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
