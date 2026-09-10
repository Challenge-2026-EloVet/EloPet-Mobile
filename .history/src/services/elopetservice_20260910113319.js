
const API_LOGIN_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_LOGIN;
const API_CREATION_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_CREATION;
const API_PET_URL = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;


// LOGIN
export const loginService = async (email, password) => {
  try {
    const response = await fetch(API_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ nomeUsuario, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Credenciais inválidas ou erro no servidor.');
    }

    return data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw error;
  }
};

// CRIAR USUARIO
export const registerService = async (nomeUsuario, email, senha, tipoUsuario = 'USER') => {
  try {
    const response = await fetch(API_CREATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ nomeUsuario, email, senha, tipoUsuario }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao realizar o cadastro.');
    }

    return data;
  } catch (error) {
    console.error('Erro na requisição de cadastro:', error);
    throw error;
  }
};

// CRUD PET