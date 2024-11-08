import React, { useState, useRef } from "react";
import { BsX } from "react-icons/bs";

function OTPModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setOtp(["", "", "", "", ""]); // Clear the OTP fields when closing
  };

  // Handle input change and move to next field
  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) { // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if a digit is entered
      if (value && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key press to go back when backspacing on an empty field
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div>
      <button onClick={openModal} className="p-2 bg-blue-500 text-white rounded">
        Receive OTP
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            {/* Close button */}
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

            {/* OTP Input Fields */}
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

export default OTPModal;
