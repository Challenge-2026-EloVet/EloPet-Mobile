export const handleCurrentUserId = async () => {
    try {
      const userId = await getStoredUserId();
      return userId;
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
      return null;
    }
  };




export const handleGetPets = async () => {
    try {
      const userId = await handleCurrentUserId();
      if (userId) {
        const petsData = await getPetsService(userId);
        return petsData;
      } else {
        console.error('ID do usuário não encontrado.');
        return [];
      }
    } catch (error) {
      console.error('Erro ao obter os dados dos pets:', error);
      return [];
    }
  };