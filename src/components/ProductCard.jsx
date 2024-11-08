
function ProductCard({ product }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
      <p className="text-primary text-xl font-bold">{product.price}</p>
      <button className="w-full p-2 mt-4 bg-accent dark:text-white rounded-lg">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
