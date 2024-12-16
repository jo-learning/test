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
    <div className="flex overflow-x-scroll gap-6 max-w-4xl mx-8 sm:pl-[160px] pl-4 mt-4">
      {categories.map(category => (
        <div key={category.id} className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden mb-2">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-center text-sm font-semibold">{category.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;
