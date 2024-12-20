
import Navbar from '../components/Navbar';
import { useState } from 'react';
import CategoryGrid from '../components/CategoryGrid';
import Footer from '../components/Footer';
import CategoryList from '../components/CategoryList';
import Restaurant from '../components/Restaurant';

function RestaurantPage() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className='bg-white text-black dark:bg-gray-600 dark:text-white'>
      
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <CategoryGrid />
    <CategoryList navigates={'/restaurant'}/>
    <Restaurant />
    <Footer />
    </div>
    
  );
}

export default RestaurantPage;
