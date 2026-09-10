import axios from 'axios';

const API_LOGIN_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_LOGIN;
const API_CREATION_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_CREATION;
const API_PETS_URL = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;

// const getAuthConfig = async () => {
//   // const token = await AsyncStorage.getItem('token');
//   return {
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       // ...(token && { 'Authorization': `Bearer ${token}` })
//     }
//   };
// };

// LOGIN
export const loginService = async (nomeUsuario, senha) => {
  try {
    // const config = await getAuthConfig();
    const response = await axios.post(API_LOGIN_URL, { nomeUsuario, senha }, config);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw new Error(error.response?.data?.message || 'Credenciais inválidas ou erro no servidor.');
  }
};

// CRIAR USUARIO
export const registerService = async (nomeUsuario, email, senha, tipoUsuario = 'USER') => {
  try {
    // const config = await getAuthConfig();
    const response = await axios.post(
      API_CREATION_URL, 
      { nomeUsuario, email, senha, tipoUsuario }
    );
    return response.data;
  } catch (error) {
    console.error('Erro na requisição de cadastro:', error);
    throw new Error(error.response?.data?.message || 'Erro ao realizar o cadastro.');
  }
};

// CRUD PET
export const createPetService = async (petData) => {
  try {
    // const config = await getAuthConfig();
    const response = await axios.post(API_PETS_URL, petData);
    return response.data;
  } catch (error) {
    console.error('Erro no createPetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar o pet.');
  }
};

export const getPetsService = async () => {
  try {
    // const config = await getAuthConfig();
    // const response = await axios.get(API_PETS_URL, config);
    const response = await axios.get(API_PETS_URL);
    return response.data;
  } catch (error) {
    console.error('Erro no getPetsService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao buscar a lista de pets.');
  }
};

export const updatePetService = async (id, petData) => {
  try {
    // const config = await getAuthConfig();
    const response = await axios.put(`${API_PETS_URL}/${id}`, petData);
    return response.data;
  } catch (error) {
    console.error('Erro no updatePetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar os dados do pet.');
  }
};

export const deletePetService = async (id) => {
  try {
    // const config = await getAuthConfig();
    const response = await axios.delete(`${API_PETS_URL}/${id}`);

    if (response.status === 204) {
      return { success: true };
    }

    return response.data;
  } catch (error) {
    console.error('Erro no deletePetService:', error);
    throw new Error(error.response?.data?.message || 'Erro ao deletar o pet.');
  }
};