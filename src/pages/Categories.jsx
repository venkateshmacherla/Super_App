import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

import action from "../assets/images/action.png";
import drama from "../assets/images/drama.png";
import romance from "../assets/images/romance.png";
import thriller from "../assets/images/thriller.png";
import western from "../assets/images/western.png";
import horror from "../assets/images/horror.png";
import fantasy from "../assets/images/fantasy.png";
import music from "../assets/images/music.png";
import fiction from "../assets/images/fiction.png";

const categories = [
  { name: "Action", image: action, color: "#FF5209" },
  { name: "Drama", image: drama, color: "#D7A4FF" },
  { name: "Romance", image: romance, color: "#148A08" },
  { name: "Thriller", image: thriller, color: "#84C2FF" },
  { name: "Western", image: western, color: "#902500" },
  { name: "Horror", image: horror, color: "#7358FF" },
  { name: "Fantasy", image: fantasy, color: "#FF4ADE" },
  { name: "Music", image: music, color: "#E61E32" },
  { name: "Fiction", image: fiction, color: "#6CD061" },
];

const Categories = () => {
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const setSelectedCategories = useStore(
    (state) => state.setSelectedCategories,
  );

  const toggleCategory = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
      setError(false);
      return;
    }

    if (selected.length >= 3) {
      setError(true);
      return;
    }

    setSelected([...selected, category]);
    setError(false);
  };

  const handleNext = () => {
    if (selected.length < 3) {
      setError(true);
      return;
    }

    setSelectedCategories(selected);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row px-5 sm:px-8 lg:px-12 py-8 lg:py-10 gap-8 lg:gap-16">
      {/* Left */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center lg:pl-20 text-center lg:text-left">
        <h1
          className="text-[#72DB73] text-[28px] sm:text-[36px] lg:text-[45px] mb-4 lg:mb-10"
          style={{ fontFamily: "Single Day" }}
        >
          Super app
        </h1>

        <h2 className="text-[26px] sm:text-[34px] lg:text-[48px] font-bold leading-tight mb-6 lg:mb-10">
          Choose your
          <br />
          entertainment
          <br />
          category
        </h2>

        <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-3 sm:mb-5">
          {selected.map((item) => (
            <div
              key={item}
              className="bg-[#148A08] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm sm:text-base"
            >
              {item}
              <button
                onClick={() => toggleCategory(item)}
                className="font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm sm:text-md">
            ⚠ Minimum 3 category required
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[52%]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => toggleCategory(category.name)}
              className={`cursor-pointer rounded-xl p-2.5 sm:p-3 transition-all ${
                selected.includes(category.name)
                  ? "border-4 border-[#11B800]"
                  : ""
              }`}
              style={{
                backgroundColor: category.color,
              }}
            >
              <h3 className="text-white text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">
                {category.name}
              </h3>

              <img
                src={category.image}
                alt={category.name}
                className="w-full h-16 sm:h-20 lg:h-22 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center sm:justify-end mt-4 sm:mt-3 pb-3">
          <button
            onClick={handleNext}
            className="w-full sm:w-auto bg-[#148A08] px-8 py-3 rounded-full cursor-pointer text-white font-medium hover:bg-[#106d06] transition-colors"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
