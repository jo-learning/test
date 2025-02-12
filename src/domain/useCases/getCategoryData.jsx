// src/domain/useCases/getUserData.js
export const getCategoryData = (repository) => {
    return repository.allCategory();
  };

export const createCategoryData = (categoryName, repository) => {
    return repository.Create(categoryName);
  };
  
  