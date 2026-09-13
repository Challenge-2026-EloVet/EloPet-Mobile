
const API_LOGIN_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_LOGIN;
const API_CREATION_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_CREATION;
const api_pet = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;


export const loginService = async (email, password) => {
  try {
    if (!API_LOGIN_URL) {
      throw new Error('A URL de login (EXPO_PUBLIC_API_JAVA_USER_LOGIN) não está configurada no .env');
    }

    const response = await fetch(API_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Credenciais inválidas ou erro no servidor.');
    }

    return data; // Retorna os dados do usuário ou token de autenticação
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw error;
  }
};