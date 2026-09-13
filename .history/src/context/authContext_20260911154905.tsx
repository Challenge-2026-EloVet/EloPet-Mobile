import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/interfaces';
import { loginService, logoutService, registerService } from '../services/eloPetService';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'user_token';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string, tipoUsuario?: string) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStoredUser() {
      try {
        const token = Platform.OS === 'web' 
          ? localStorage.getItem(TOKEN_KEY) 
          : await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          // Se tiver token, você pode decodificá-lo ou buscar os dados do usuário na API.
          // Por enquanto, definimos um usuário básico ou podemos buscar o perfil.
        }
      } catch (error) {
        console.error('Erro ao carregar sessão salva:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoredUser();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const responseData = await loginService(username, password);
      
      // Monta o objeto do usuário com base no retorno da API ou nos dados enviados
      const loggedUser: User = {
        nomeUsuario: username,
        email: responseData.email || '',
        senha: '', // Nunca armazene senha em memória/contexto
        tipoUsuario: responseData.tipoUsuario || 'USER',
      };

      setUser(loggedUser);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (username: string, email: string, password: string, tipoUsuario = 'USER') => {
    try {
      await registerService(username, email, password, tipoUsuario);
      // Após cadastrar, já faz o login automático ou redireciona
      await signIn(username, password);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await logoutService();
    setUser(null);
  };

  const updateUserProfile = (updatedData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedData };
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider.');
  }

  return context;
}