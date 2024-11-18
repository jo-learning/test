import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { BsX } from "react-icons/bs";

function SignUpForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+251",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);

  const countryCodes = [
    { code: "+1", name: "US" },
    { code: "+44", name: "UK" },
    { code: "+91", name: "In" },
    { code: "+251", name: "Eth" },
    { code: "+254", name: "Ken" },
    // Add more country codes as needed
  ];

  const openModal = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setOtp(["", "", "", "", ""]); // Clear the OTP fields when closing
  };

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) { // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!/^[97]\d{9}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits and start with 9 or 7";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-sm mb-10 sm:mb-0 mx-auto p-8 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Sign Up</h2>
      <form onSubmit={openModal}>
        <input
          type="text"
          placeholder="Username"
          className="input-field mb-3"
          value={formData.username}
          onChange={(e) => {setFormData({ ...formData, username: e.target.value }); setErrors({})}}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input-field mb-3"
          value={formData.email}
          onChange={(e) => {setFormData({ ...formData, email: e.target.value }); setErrors({})}}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          className="input-field mb-3"
          value={formData.password}
          onChange={(e) => {setFormData({ ...formData, password: e.target.value }); setErrors({})}}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field mb-3"
          value={formData.confirmPassword}
          onChange={(e) =>
            {setFormData({ ...formData, confirmPassword: e.target.value }); setErrors({})}
          }
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <div className="flex ">
          {/* <p className="bg-white text-gray-800 items-center justify-center flex px-1 mr-1 rounded-lg h-[50px]">
            +251
          </p> */}
          <select
            value={formData.countryCode}
            onChange={(e) =>
              setFormData({ ...formData, countryCode: e.target.value })
            }
            className="bg-white text-gray-800 items-center justify-center flex px-1 mr-1 rounded-lg h-[50px]"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="900000000"
            className="input-field mb-3 "
            value={formData.phone}
            onChange={(e) => {setFormData({ ...formData, phone: e.target.value }); setErrors({})}}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <div className="flex justify-normal mb-4">
          <label>
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) =>
                {setFormData({ ...formData, termsAccepted: e.target.checked }); setErrors({})}
              }
            />{" "}
            {" Accept to the "}
            <Link to={"/forgot-password"} className="text-blue-500 hover:underline">
              {" terms and conditions"}
            </Link>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
        )}

        <button type="submit" className="w-full p-2 bg-brand-primary text-white dark:text-white rounded-lg">
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to={"/signin"} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              <BsX size={24} />
            </button>
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Enter OTP
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Please enter the 5-digit OTP sent to your mobile.
            </p>
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-10 h-10 text-center text-xl font-semibold border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                />
              ))}
            </div>

            <button
              onClick={closeModal}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpForm;
