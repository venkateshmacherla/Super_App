import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import { getNews } from "../services/newsService";
import { useNavigate } from "react-router-dom";

import {
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiDaySunny,
  WiSnow,
  WiSprinkle,
  WiStrongWind,
  WiHumidity,
  WiThermometer,
} from "react-icons/wi";
import useStore from "../store/useStore";
import profile from "../assets/images/profile.png";
import news from "../assets/images/news.png";
import Notes from "../components/Notes";
import Timer from "../components/Timer";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);

  const [weather, setWeather] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentNews, setCurrentNews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeather();
        const newsData = await getNews();
        setWeather(weatherData);
        setNewsArticles(newsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (newsArticles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsArticles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [newsArticles]);

  const article = newsArticles[currentNews];

  const weatherIcons = {
    Clouds: <WiCloud size={56} />,
    Rain: <WiRain size={56} />,
    Thunderstorm: <WiThunderstorm size={56} />,
    Clear: <WiDaySunny size={56} />,
    Snow: <WiSnow size={56} />,
    Drizzle: <WiSprinkle size={56} />,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-center px-6">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:h-[calc(100vh-3rem)]">
        {/* LEFT + CENTER */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row gap-4 md:items-stretch">
            {/* PROFILE + WEATHER */}
            <div className="w-full md:w-[65%] flex flex-col gap-4">
              {/* Profile Card */}
              <div className="bg-[#5746EA] rounded-3xl p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:h-40">
                <img
                  src={profile}
                  alt="profile"
                  className="w-20 h-32 sm:w-24 sm:h-40 md:w-28 md:h-full object-cover rounded-full sm:rounded-[100px] border-4 sm:border-[5px] border-white shadow-[0px_8px_7px_rgba(0,0,0,0.3)] mx-auto sm:mx-0 shrink-0"
                />
                <div className="flex flex-col justify-center text-center sm:text-left">
                  <p className="text-white text-md sm:text-md">{user.name}</p>
                  <p className="text-white text-sm sm:text-md break-all">
                    {user.email}
                  </p>
                  <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                    {user.username}
                  </h1>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                    {selectedCategories.map((category) => (
                      <div
                        key={category}
                        className="bg-[#9F94FF] px-4 sm:px-6 py-1 rounded-full text-white text-xs sm:text-sm"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weather Card */}
              <div className="rounded-3xl overflow-hidden">
                <div className="bg-[#FF4ADE] flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 items-center px-4 sm:px-8 md:px-16 py-2 text-white font-bold text-base sm:text-xl md:text-2xl text-center">
                  <span>{new Date().toLocaleDateString()}</span>
                  <span>
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="bg-[#101744] px-4 sm:px-6 md:px-8 py-4 flex flex-wrap sm:flex-nowrap justify-around items-center gap-4">
                  {/* Weather */}
                  <div className="text-center text-white">
                    <div className="flex justify-center">
                      {weatherIcons[weather.weather[0].main] || (
                        <WiCloud size={56} />
                      )}
                    </div>
                    <p className="text-sm sm:text-base md:text-lg">
                      {weather.weather[0].main}
                    </p>
                  </div>

                  <div className="hidden sm:block w-px h-16 md:h-20 bg-white/40"></div>

                  {/* Temp */}
                  <div className="text-center text-white">
                    <h1 className="text-2xl sm:text-3xl">
                      {Math.round(weather.main.temp)}°C
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-1 text-xs sm:text-sm">
                      <WiThermometer size={24} />
                      <div>
                        <p>{weather.main.pressure} mbar</p>
                        <p>Pressure</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block w-px h-16 md:h-20 bg-white/40"></div>

                  {/* Wind & Humidity */}
                  <div className="text-white text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <WiStrongWind size={24} />
                      <div>
                        <p>{weather.wind.speed} km/h</p>
                        <p>Wind</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 sm:mt-4">
                      <WiHumidity size={24} />
                      <div>
                        <p>{weather.main.humidity}%</p>
                        <p>Humidity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="w-full md:w-[35%] flex min-h-45 md:min-h-0">
              <div className="bg-[#F1C75B] rounded-3xl p-4 w-full flex flex-col">
                <Notes />
              </div>
            </div>
          </div>

          {/* TIMER */}
          <div className="flex-1">
            <Timer />
          </div>
        </div>

        {/* NEWS */}
        <div className="w-full lg:w-[30%] flex flex-col">
          <div className="bg-white rounded-3xl overflow-hidden flex-1 flex flex-col">
            <img
              src={article?.image_url || news}
              alt="news"
              className="w-full h-44 sm:h-52 lg:h-56 object-cover"
            />
            <div className="bg-[#000000B2] text-white p-3">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
                {article?.title}
              </h2>
              <p className="text-xs mt-1">
                {article?.pubDate
                  ? new Date(article.pubDate).toLocaleString()
                  : ""}
              </p>
            </div>
            <div className="p-4 text-black text-sm leading-6 flex-1">
              {article?.description}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-row justify-center sm:justify-end gap-3 mt-4 sm:mt-5">
            <button
              onClick={() => navigate("/categories")}
              className="flex-1 sm:flex-1 sm:max-w-40 bg-[#5746EA] text-white px-6 py-3 rounded-full text-xs cursor-pointer text-center hover:bg-[#4636c9] transition-colors"
            >
              Back to Categories
            </button>
            <button
              onClick={() => navigate("/movies")}
              className="flex-1 sm:flex-1 sm:max-w-40 bg-[#148A08] text-white px-6 py-3 rounded-full text-xs cursor-pointer text-center hover:bg-[#106d06] transition-colors"
            >
              Browse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
