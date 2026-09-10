// Alterado de '@user_token' para 'user_token'
const TOKEN_KEY = 'user_token';

const getAuthConfig = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };
  } catch (error) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
  }
};

export const loginService = async (nomeUsuario, senha) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { nomeUsuario, senha });
    
    const token = response.data.token || response.data; 
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, String(token));
    }

    return response.data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw new Error(error.response?.data?.message || 'Credenciais inválidas ou erro no servidor.');
  }
};

export const logoutService = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
};