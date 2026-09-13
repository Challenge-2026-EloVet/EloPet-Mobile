import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserService, loginService, registerService } from '../services/eloPetService';
import { User } from '../types/interfaces';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const { setIsAuthenticated, setUser } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [userType, setUserType] = useState('');
  const [activeTab, setActiveTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('Preencha o nome de usuário e a senha.');
        return;
      }

      setIsLoading(true);

      const loginResponse = await loginService(email, password);

      console.log(loginResponse);

      const userId = loginResponse.idResponsavel;

      if (!userId) {
        throw new Error('A API de login não retornou o idResponsavel.');
      }

      const userData = await getUserService(userId);

      if (setUser) setUser(userData);
      setIsAuthenticated(true);

      console.log('Login e sincronização de perfil bem-sucedidos');

    } catch (error: any) {
      alert(error?.message || error || 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      if (!username || !email || !password || !name || !cpf) {
        alert('Preencha todos os campos para se cadastrar.');
        return;
      }

      setIsLoading(true);

      const type = 'RESPONSAVEL';
      setUserType(type);

      await registerService(username, email, password, type, name, cpf);

      const loginResponse = await loginService(email, password);

      const userId = loginResponse?.idResponsavel || loginResponse?.id;

      if (!userId) {
        throw new Error('A API não retornou o identificador do usuário após o login automático.');
      }

      const userData = await getUserService(userId);

      if (setUser) setUser(userData);
      setIsAuthenticated(true);

      console.log('Cadastro, login automático e sincronização bem-sucedidos');

    } catch (error: any) {
      alert(error?.message || error || 'Erro ao realizar cadastro.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSignUpForms = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#A0AEC0"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="00000000000"
          placeholderTextColor="#A0AEC0"
          value={cpf}
          onChangeText={setCPF}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome de Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#A0AEC0"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor="#A0AEC0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, isLoading && styles.disabledButton]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome de Usuário / E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="usuario@email.com"
          placeholderTextColor="#A0AEC0"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={alert('Código de recuperação enviado ao ')}
          >
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.primaryButton, isLoading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <View style={styles.badgeIcon}>
              <Text style={styles.badgeText}>🐾</Text>
            </View>
            <Text style={styles.title}>
              {activeTab ? 'Crie sua conta' : 'Bem-vindo de volta!'}
            </Text>
            <Text style={styles.subtitle}>
              {activeTab
                ? 'Insira seus dados para começar a cuidar do seu pet'
                : 'Acesse sua conta para cuidar da saúde do seu pet'}
            </Text>
          </View>

          {activeTab ? renderSignUpForms() : renderLoginForm()}

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {activeTab ? 'Já tem uma conta? ' : 'Ainda não tem uma conta? '}
            </Text>
            <TouchableOpacity onPress={() => setActiveTab(!activeTab)}>
              <Text style={styles.signUpText}>
                {activeTab ? 'Entre' : 'Cadastre-se'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E6EFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#185A43',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#7E9F8E',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#185A43',
    marginBottom: 8,
  },
  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#185A43',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7E9F8E',
  },
  primaryButton: {
    height: 52,
    backgroundColor: '#185A43',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#7E9F8E',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#185A43',
  },
});