import React from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className=" container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Services</h3>
          <ul>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Individual Delivery</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Bussiness Delivery</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Specialized services</Link>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Partners</h3>
          <ul>
            <li className="mb-2">
              <Link href="#" className=" text-gray-200 text-sm hover:text-gray-400">Delivers</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Restaurants</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Abcdasld</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Policies</h3>
          <ul>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Terms and conditions</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Privacy policy</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Fraud disclaimer</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contacts</h3>
          <ul>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Around CBE Main Branch, in front of Garad Building, Mekelle, Tigray</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Phone: +251914020566</Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-200 text-sm hover:text-gray-400">Email: zosklauslog2016@gmail.com</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-900 text-gray-400 text-center py-4 flex justify-center">
        <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        <div className="flex ml-3 space-x-1">
        <AiFillFacebook size={20} />
        <AiFillInstagram size={20} />
        <AiFillYoutube size={20} /></div>
        
      </div>
    </footer>
  );
};

export default Footer;
