
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import { useState } from 'react';
import ImageSlider from '../components/Slider';
import CategoryGrid from '../components/CategoryGrid';
import Footer from '../components/Footer';
import CategoryList from '../components/CategoryList';

function Home() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className='bg-white text-black dark:bg-gray-600 dark:text-white'>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <CategoryList />
    {/* <h1 className="text-3xl mt-4 font-bold text-center mb-8">Welcome to Zoskalus Platform Store</h1> */}
    {/* <ImageSlider /> */}
    {/* <CategoryGrid /> */}
    <div className="p-6 sm:mx-[160px]">
      
      <ProductGrid />
    </div>
    <Footer />
    </div>
    
  );
}

export default Home;
