
const API_LOGIN_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_LOGIN;
const API_CREATION_URL = process.env.EXPO_PUBLIC_API_JAVA_USER_CREATION;
const API_PETS_URL = process.env.EXPO_PUBLIC_API_JAVA_PET_CRUD;


// LOGIN
export const loginService = async (nomeUsuario, senha) => {
  try {
    const response = await fetch(API_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ nomeUsuario, senha }),
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
export const registerService = async (nomeUsuario, email, senha, tipoUsuario) => {
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
// const getAuthHeaders = async () => {
//   return {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${token}` // Descomente se usar token JWT
//   };
// };

export const createPetService = async (petData) => {
  try {

    // const headers = await getAuthHeaders();

    const response = await fetch(API_PETS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(petData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao cadastrar o pet.');
    }

    return data;
  } catch (error) {
    console.error('Erro no createPetService:', error);
    throw error;
  }
};

export const getPetsService = async () => {
  try {

    // const headers = await getAuthHeaders();
    const response = await fetch(API_PETS_URL, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar a lista de pets.');
    }

    return data; 
  } catch (error) {
    console.error('Erro no getPetsService:', error);
    throw error;
  }
};

export const updatePetService = async (id, petData) => {
  try {

    // const headers = await getAuthHeaders();
    const response = await fetch(`${API_PETS_URL}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(petData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao atualizar os dados do pet.');
    }

    return data;
  } catch (error) {
    console.error('Erro no updatePetService:', error);
    throw error;
  }
};

export const deletePetService = async (id) => {
  try {
    if (!API_PETS_URL) throw new Error('A URL da API de Pets não está configurada no .env');

    const headers = await getAuthHeaders();
    const response = await fetch(`${API_PETS_URL}/${id}`, {
      method: 'DELETE',
      headers,
    });

    // Algumas APIs retornam 204 No Content (sem corpo JSON) ao deletar com sucesso
    if (response.status === 204) {
      return { success: true };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao deletar o pet.');
    }

    return data;
  } catch (error) {
    console.error('Erro no deletePetService:', error);
    throw error;
  }
};