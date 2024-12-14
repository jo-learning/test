// src/domain/useCases/signupUser.js
export const signupUser = async (userData, authRepository) => {
    return authRepository.signup(userData);
  };