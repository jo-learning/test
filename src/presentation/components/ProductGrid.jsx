
import ProductCard from './ProductCard';
import { apiClient } from '../../data/services/apiClient';
import { useEffect, useState } from 'react';

const product = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 5, name: 'Product 5', price: 59.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 6, name: 'Product 6', price: 69.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 7, name: 'Product 7', price: 69.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 8, name: 'Product 8', price: 69.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 9, name: 'Product 9', price: 69.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 10, name: 'Product 10', price: 69.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  { id: 11, name: 'Product 11', price: 69.99, image: 'https://via.placeholder.com/150', restaurant: {name: "Shege"} },
  // More products...
];

function ProductGrid() {
  const [products, setProducts] = useState(product)
  const handleFetchFood = async()=>{
    const currentPage = 1
    const itemsPerPage = 4
    const response = await apiClient.get(`/api/food/fetchFoods?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc`)
    console.log(response)
    setProducts(response.data.data)
    // setSortedUsers(response.data.data);
    // setTotalPages(response.data.pagination.total)
  }
  useEffect(()=> {
    handleFetchFood()
  },[])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
