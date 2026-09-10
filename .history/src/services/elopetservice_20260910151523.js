import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; 

const API_LOGIN_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_LOGIN;
const API_CREATION_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_CREATION;
const API_PETS_URL = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;

// Função auxiliar para injetar o Token JWT com segurança
const getAuthConfig = async () => {
  try {
    const token = await SecureStore.getItemAsync('@user_token');
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

// LOGIN
const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert('Preencha o nome de usuário e a senha.'); // Ajustado o texto para refletir a variável
        return;
      }

      await loginService(username, password);

      console.log('Login bem-sucedido');
      
      // Passando como objeto (padrão do React Navigation) em vez de array
      navigation.navigate('MainTabs', { username }); 

    } catch (error: any) {
      alert(error?.message || error || 'Não foi possível conectar ao servidor.');
    }
  };

// LOGOUT (Dica útil: para apagar o token ao deslogar)
export const logoutService = async () => {
  try {
    await SecureStore.deleteItemAsync('@user_token');
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
};

// CRIAR USUARIO
export const registerService = async (nomeUsuario, email, senha, tipoUsuario = 'USER') => {
  try {
    const response = await axios.post(API_CREATION_URL, { nomeUsuario, email, senha, tipoUsuario });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição de cadastro:', error);
    throw new Error(error.response?.data?.message || 'Erro ao realizar o cadastro.');
  }
};

// CRUD PET (Protegidos por Token)
export const createPetService = async (petData) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.post(API_PETS_URL, petData, config);
    return response.data;
  } catch (error) {
    console.error('Erro no createPetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar o pet.');
  }
};

export const getPetsService = async () => {
  try {
    const config = await getAuthConfig();
    const response = await axios.get(API_PETS_URL, config);
    return response.data;
  } catch (error) {
    console.error('Erro no getPetsService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao buscar a lista de pets.');
  }
};

export const updatePetService = async (id, petData) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.put(`${API_PETS_URL}/${id}`, petData, config);
    return response.data;
  } catch (error) {
    console.error('Erro no updatePetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar os dados do pet.');
  }
};

export const deletePetService = async (id) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.delete(`${API_PETS_URL}/${id}`, config);

    if (response.status === 204) {
      return { success: true };
    }

    return response.data;
  } catch (error) {
    console.error('Erro no deletePetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao deletar o pet.');
  }
};