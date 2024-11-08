
import Navbar from '../components/Navbar';
import { useState } from 'react';
import Cart from '../components/Cart';

function CartPage() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <Cart />
    </>
    
  );
}

export default CartPage;
