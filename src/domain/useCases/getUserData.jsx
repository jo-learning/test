// src/domain/useCases/getUserData.js
export const getUserData = (userId, repository) => {
    return repository.fetchUser(userId);
  };
  