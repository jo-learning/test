
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import { useState } from 'react';
import ImageSlider from '../components/Slider';
import CategoryGrid from '../components/CategoryGrid';

function Home() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <ImageSlider />
    <CategoryGrid />
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Zoskalus Platform Store</h1>
      <ProductGrid />
    </div>
    </>
    
  );
}

export default Home;
