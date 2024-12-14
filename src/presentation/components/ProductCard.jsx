import CounterContext from "../../shared/utils/CartCounter";
import ProductContext from "../../shared/utils/ProductContext";
import { useContext, useEffect } from "react";

function ProductCard({ product }) {
  const { addCounter } = useContext(CounterContext);
  const { formData, addData } = useContext(ProductContext);
  useEffect(() => {}, []);

  const add = (product) => {
    if (formData.length > 0) {
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
      <img src={product.image} alt={product.name} className="w-full h-40" />
      <h3 className="text-lg mt-4 px-4">{product.name}</h3>
      <p className="text-primary text-xl font-bold px-4">
        {product.restaurant_name}
      </p>
      <p className="text-primary font-bold text-[17px] px-4">
        Price: {product.price}
      </p>
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
