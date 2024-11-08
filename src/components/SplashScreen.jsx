import React, { useState, useEffect } from 'react';

const quotes = [
  "Welcome to our eCommerce store!",
  "Discover great products every day.",
  "Shopping made easy and enjoyable.",
  "Thank you for visiting us!",
];

function SplashScreen() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Rotate quotes every 2 seconds
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="p-6 flex items-center justify-center w-screen h-screen bg-gray-800 text-white">
      <div className="text-center w-full">
        <div className="loader mb-4 w-full"></div>
        <p className="text-lg">{quotes[quoteIndex]}</p>
      </div>
    </div>
  );
}

export default SplashScreen;
