import { NavLink } from "react-router-dom";
import CounterContext from "../../shared/utils/CartCounter";
import ProductContext from "../../shared/utils/ProductContext";
import { useContext, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function ProductCard({ product }) {
  const { addCounter } = useContext(CounterContext);
  const { formData, addData } = useContext(ProductContext);
  useEffect(() => {}, []);

  const add = (product) => {
    if (formData.length > 0) {
      {/* eslint-disable-next-line react/prop-types */}
      const conditon = formData.some((obj) => obj.id === product.id);
      if (!conditon) {
        addCounter();
        addData(product);
      }
    } else {
      addCounter();
      addData(product);
    }
  };
  return (
    <div className="dark:bg-gray-800 shadow-lg rounded-lg">
       {/* eslint-disable-next-line react/prop-types */}
      <NavLink to={`/detail/${product.id}`} className={'text-black '}>
      {/* eslint-disable-next-line react/prop-types */}
      <img src={'https://via.placeholder.com/150'} alt={product.name} className="w-full h-40" />
      {/* eslint-disable-next-line react/prop-types */}
      <h3 className="text-lg mt-4 px-4">{product.name}</h3>
      <p className="text-primary text-xl font-bold px-4">
        {/* eslint-disable-next-line react/prop-types */}
        {product.restaurant && ( product.restaurant.name)}
      </p>
      <p className="text-primary font-bold text-[17px] px-4">
        {/* eslint-disable-next-line react/prop-types */}
        Price: {product.price}
      </p>
      </NavLink>
      <button
        className="w-full p-2 mt-4 bg-brand-primary text-white dark:text-white rounded-lg"
        onClick={() => {
          add(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
