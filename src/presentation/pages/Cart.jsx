
import Navbar from '../components/Navbar';
import { useState } from 'react';
import Table from '../components/Cart';

function CartPage() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className=''>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <Table />
    </div>
    
  );
}

export default CartPage;
