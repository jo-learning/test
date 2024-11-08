import React from 'react';

const categories = [
  { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Clothing', image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Home & Kitchen', image: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Beauty', image: 'https://via.placeholder.com/100' },
  // Add more categories as needed
];

function CategoryGrid() {
  return (
    <div className="flex overflow-x-scroll gap-6 max-w-4xl mx-8">
      {categories.map(category => (
        <div key={category.id} className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-center text-lg font-semibold">{category.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;
