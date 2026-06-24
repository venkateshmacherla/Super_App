import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import registerBg from "../../assets/images/register-bg.png";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Field is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Field is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Field is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Field is required";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter valid mobile number";
    }

    if (!formData.agreed) {
      newErrors.agreed = "Check this box if you want to proceed";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
      });

      navigate("/categories");
    }
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row">
      {/* Left */}
      <div className="hidden lg:block w-full lg:w-1/2 relative">
        <img
          src={registerBg}
          alt="register"
          className="w-full h-full object-cover"
        />

        <h1 className="absolute bottom-10 left-10 text-white text-[38px] text-4xl font-bold">
          Discover new things on
          <br />
          Superapp
        </h1>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center px-5 py-10 lg:px-0 lg:py-0">
        <div className="w-full max-w-95 lg:w-95">
          <h1
            className="text-[#72DB73] text-[42px] lg:text-[58px] font-normal leading-[140%] text-center"
            style={{ fontFamily: "Single Day, cursive" }}
          >
            Super app
          </h1>

          <p
            className="text-white text-center text-[15px] font-normal leading-[140%] mb-8"
            style={{ fontFamily: "DM Sans" }}
          >
            Create your new account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`h-11.25 bg-[#292929] rounded px-4 text-white outline-none ${
                errors.name ? "border border-red-500" : ""
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-xs -mt-2">{errors.name}</p>
            )}

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="UserName"
              className={`h-11.25 bg-[#292929] rounded px-4 text-white outline-none ${
                errors.username ? "border border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs -mt-2">{errors.username}</p>
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`h-11.25 bg-[#292929] rounded px-4 text-white outline-none ${
                errors.email ? "border border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs -mt-2">{errors.email}</p>
            )}

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className={`h-11.25 bg-[#292929] rounded px-4 text-white outline-none ${
                errors.mobile ? "border border-red-500" : ""
              }`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs -mt-2">{errors.mobile}</p>
            )}

            <label
              className="flex items-center gap-2 text-[#7C7C7C] text-xs mt-1"
              style={{ fontFamily: "DM Sans" }}
            >
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
              />
              Share my registration data with Superapp
            </label>
            {errors.agreed && (
              <p className="text-red-500 text-xs -mt-1">{errors.agreed}</p>
            )}

            <button
              type="submit"
              className="mt-3 h-12 bg-[#72DB73] rounded-full cursor-pointer text-white font-semibold"
            >
              SIGN UP
            </button>

            <p
              className="mt-2 text-[#7C7C7C] text-[13px] leading-3.5"
              style={{ fontFamily: "Roboto" }}
            >
              By clicking on Sign up, you agree to Superapp{" "}
              <span className="text-[#72DB73]">
                Terms and Conditions of Use
              </span>
            </p>

            <p
              className="mt-1 text-[#7C7C7C] text-[13px] leading-3.5"
              style={{ fontFamily: "Roboto" }}
            >
              To learn more about how Superapp collects, uses, shares and
              protects your personal data please read Superapp{" "}
              <span className="text-[#72DB73]">Privacy Policy</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
