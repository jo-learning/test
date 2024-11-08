import React, { useState, useEffect } from 'react';
import image1 from '../assets/zos.png';

const quotes = [
  "Welcome to our eCommerce store!",
  "Discover great products every day.",
  "Shopping made easy and enjoyable.",
  "Thank you for visiting us!",
];

function SplashScreen() {
  

  useEffect(() => {
    // Rotate quotes every 2 seconds
    const interval = setInterval(() => {
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="p-6 flex  items-center justify-center w-screen h-screen bg-gray-800 text-white">
      <div className="flex flex-col text-center w-full">
        <div className="loader mb-4 items-center flex justify-center"><img src={image1} className='w-[200px] h-[200px] items-center ' /></div>
        
        <p className="text-lg">{quotes[0]}</p>
      </div>
    </div>
  );
}

export default SplashScreen;
