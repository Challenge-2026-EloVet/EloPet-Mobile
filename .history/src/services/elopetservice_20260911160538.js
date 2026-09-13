import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_LOGIN_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_LOGIN;
const API_CREATION_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_CREATION;
const API_UPDATE_URL = process.env.API_UPDATE_URL
const API_PETS_URL = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;

const TOKEN_KEY = 'user_token';


// AQUI TA VALIDANDO O TIPO DE PLATAFORMA USADA NA ARMAZENAGEM DO TOKEN E POSTERIOR ENVIO NA REQUISIÇÃO 
// TESTE EM WEB PRECISA USAR LOCALSTORAGE
const storage = {
  async setItem(key, value) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async getItem(key) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  async removeItem(key) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

const getAuthConfig = async () => {
  try {
    const token = await storage.getItem(TOKEN_KEY);
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
      await storage.setItem(TOKEN_KEY, String(token));
    }

    return response.data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw new Error(error.response?.data?.message || 'Credenciais inválidas ou erro no servidor.');
  }
};

export const logoutService = async () => {
  try {
    await storage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
};

export const registerService = async (nomeUsuario, email, senha, tipoUsuario = 'USER') => {
  try {
    const response = await axios.post(API_CREATION_URL, { nomeUsuario, email, senha, tipoUsuario });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição de cadastro:', error);
    throw new Error(error.response?.data?.message || 'Erro ao realizar o cadastro.');
  }
};

export const updateUserService = async (id, userData) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.put(`${API_UPDATE_URL}/${id}`, petData, config);
    return response.data;
  } catch (error) {
    console.error('Erro no updatePetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar os dados do pet.');
  }
};


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