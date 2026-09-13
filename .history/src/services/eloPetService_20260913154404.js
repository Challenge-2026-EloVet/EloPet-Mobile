import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_LOGIN_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_LOGIN;
const API_CREATION_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_CREATION;
const API_USER_URL = process.env.EXPO_PUBLIC_API_JAVA_USER;
const API_PETS_URL = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;c
const API_PETS__URL = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;


const TOKEN_KEY = 'user_token';

const USER_ID_KEY = 'user_id';


// AQUI É PRA PERSISTIR O ID DO USER LOGADO NA APLICAÇÃO
export const getStoredUserId = async () => {
  return await storage.getItem(USER_ID_KEY);
};

// AQUI É PARA QUE O APP.TSX VERIFIQUE SE O USUARIO JÁ ESTÁ LOGADO OU NAO AO ABRIR O APLICATIVO
export const getStoredToken = async () => {
  return await storage.getItem(TOKEN_KEY);
};


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
    const token =   await storage.getItem(TOKEN_KEY);
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

// API LOGIN
export const loginService = async (email, senha) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { email, senha });

    const token = response.data.token || response.data.accessToken || response.data;
    const userId = response.data.idResponsavel || response.data.id;

    if (token) {
      await storage.setItem(TOKEN_KEY, String(token));
    }
    if (userId) {
      await storage.setItem(USER_ID_KEY, String(userId));
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
    await storage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error('Erro ao remover o token/usuário:', error);
  }
};

export const registerService = async (nomeUsuario, email, senha, tipoUsuario = 'RESPONSAVEL', nomeCompleto, cpf) => {
  try {
    const response = await axios.post(API_CREATION_URL, { nomeUsuario, email, senha, tipoUsuario, nomeCompleto, cpf });
    
    const token = response.data.token || response.data.accessToken;
    const userId = response.data.idResponsavel || response.data.id || response.data.userId;

    if (token) {
      await storage.setItem(TOKEN_KEY, String(token));
    }
    if (userId) {
      await storage.setItem(USER_ID_KEY, String(userId));
    }

    return response.data;
  } catch (error) {
    console.error('Erro na requisição de cadastro:', error);
    throw new Error(error.response?.data?.message || 'Erro ao realizar o cadastro.');
  }
};

// API RESPOSIBLE
export const getUserService = async (id) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.get(`${API_USER_URL}/${id}`, config);
    return response.data; 
  } catch (error) {
    console.error('Erro no getUserService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao buscar dados do usuário.');
  }
};

export const updateUserService = async (id, userData) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.put(`${API_USER_URL}/${id}`, userData, config);
    return response.data;
  } catch (error) {
    console.error('Erro no updateUserService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar os dados do usuario.');
  }
};

// API PETS
export const createPetService = async (petData) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.post(`${API_PETS_URL}`, petData, config);
    return response.data;
  } catch (error) {
    console.error('Erro no createPetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar o pet.');
  }
};

export const getPetsService = async (idResponsable) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.get(`${API_PETS_URL}/${idResponsable}`, config);
    const petsData = response.data;
    const hiddenPets = await getHiddenPetsService();

    if (Array.isArray(petsData)) {
      return petsData.filter(item => {
        const petId = item?.pet?.idPet || item?.idPet;
        return !hiddenPets.includes(petId);
      });
    }

    return petsData;
  } catch (error) {
    console.error('Erro no getPetsService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao buscar a lista de pets.');
  }
};

export const updatePetService = async (idPet, petData) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.put(`${API_PETS_URL}/${idPet}`, petData, config);
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

const HIDDEN_PETS_KEY = 'hidden_pets';

export const getHiddenPetsService = async () => {
  try {
    const data = await storage.getItem(HIDDEN_PETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const softDeletePetService = async (petId) => {
  try {
    const hidden = await getHiddenPetsService();
    if (!hidden.includes(petId)) {
      hidden.push(petId);
      await storage.setItem(HIDDEN_PETS_KEY, JSON.stringify(hidden));
    }
    return { success: true };
  } catch (error) {
    console.error('Erro no soft delete:', error);
    throw new Error('Não foi possível ocultar o pet.');
  }
};