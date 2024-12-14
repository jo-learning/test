// src/domain/useCases/signinUser.js
export const signinUser = async (credentials, authRepository) => {
    return authRepository.signin(credentials);
  };
  