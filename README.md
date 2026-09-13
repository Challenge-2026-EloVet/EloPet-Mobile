# 🐾 EloPet

> Aplicativo mobile desenvolvido em **React Native** com **Expo** para gestão integrada da saúde de animais de estimação, conectando tutores a clínicas veterinárias parceiras e oferecendo ferramentas de monitoramento diário.

---

## 📋 Visão Geral do Projeto

O **EloPet** é um projeto acadêmico desenvolvido com o objetivo de facilitar a rotina de cuidados de tutores de cães e gatos. A aplicação centraliza informações vitais sobre o pet, auxilia no acompanhamento preventivo por meio de um assistente de triagem inteligente, e facilita a busca por clínicas veterinárias credencionadas com suporte a geolocalização e rotas.

---

## 🛠️ Tecnologias e Stack Utilizada

O projeto foi construído utilizando tecnologias modernas do ecossistema React Native:

*   **Framework:** [React Native](https://reactnative.dev/) (v0.86.3) com [Expo](https://expo.dev/) (~57.0.20)
*   **Navegação:** [React Navigation](https://reactnavigation.org/) (Bottom Tabs e Native Stack v7)
*   **Gerenciamento de Estado e Cache:** [TanStack React Query](https://tanstack.com/query) (v5)
*   **Requisições HTTP:** [Axios](https://axios-http.com/)
*   **Armazenamento Seguro:** `expo-secure-store` (com fallback para `localStorage` no ambiente web)
*   **Estilização:** StyleSheet nativo otimizado com paleta de cores institucional baseada em tons de verde (`#185A43`, `#A3D9C9`)

---

## 📱 Estrutura de Telas e Módulos

A aplicação está estruturada em fluxos modulares organizados para proporcionar uma experiência fluida:

1.  **`Login.tsx` / `AuthProvider.tsx`:**
    *   Gerenciamento de autenticação de responsáveis.
    *   Suporte a login e cadastro de novos usuários com persistência segura de tokens e IDs de sessão.
2.  **`HomeScreen.tsx`:**
    *   Dashboard principal contendo seletor dinâmico de múltiplos pets vinculados à conta.
    *   Exibição de scores de risco de saúde, estatísticas rápidas e checklist de cuidados diários.
    *   Tratamento de estado vazio para novos usuários sem pets cadastrados.
3.  **`ProfileScreen.tsx`:**
    *   Painel do usuário com informações de contato e preferências.
    *   Listagem integrada de animais de estimação com ações rápidas de edição e remoção (soft delete).
    *   Modal para atualização de dados cadastrais do responsável.
4.  **`RegisterPetScreen.tsx`:**
    *   Formulário unificado para cadastro ou edição de pets (suporta cães, gatos e outras espécies).
    *   Coleta de dados como raça, idade aproximada, data de nascimento, sexo e status de castração.
    *   Invalidação automática de cache via React Query para atualização instantânea nas demais telas.
5.  **`ClinicSearchScreen.tsx`:**
    *   Busca interativa por clínicas parceiras na rede credencionada.
    *   Filtros por especialidades (Ortopedia, Cardiologia, Acessibilidade) e distância.
    *   Mapa interativo simulado com pinos de localização e simulação de traçado de rotas.
6.  **`ChatScreen.tsx`:**
    *   Canal de atendimento com o "Assistente Elo Vet".
    *   Respostas rápidas interativas para relatar o apetite, nível de energia e bem-estar diário do pet.

---

## ⚙️ Arquitetura de Serviços (`eloPetService.js`)

A camada de serviços centraliza a comunicação com a API backend em Java, implementando:
*   Configuração dinâmica de cabeçalhos de autorização (`Bearer Token`).
*   Gerenciamento multiplataforma de tokens (`SecureStore` para dispositivos móveis e `localStorage` para web).
*   Endpoints isolados para Autenticação, Gestão de Usuário/Responsável e CRUD completo de Pets.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em sua máquina:

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   Gerenciador de pacotes `npm` ou `yarn`
*   Aplicativo **Expo Go** instalado no seu smartphone (ou emulador Android/iOS configurado)

### 2. Clonar o Repositório e Instalar Dependências
```bash
git clone https://github.com/Challenge-2026-EloVet/EloPet-Mobile
cd EloPet-Mobile
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseando-se nas rotas da sua API backend em Java:
```env
EXPO_PUBLIC_API_JAVA_USER_LOGIN=https://sua-api.com/api/v1/auth/login
EXPO_PUBLIC_API_JAVA_USER_CREATION=https://sua-api.com/api/v1/usuarios
EXPO_PUBLIC_API_JAVA_USER=https://sua-api.com/api/v1/usuarios
EXPO_PUBLIC_API_JAVA_PET_CRD=https://sua-api.com/api/v1/pets
EXPO_PUBLIC_API_JAVA_PET_UPDATE=https://sua-api.com/api/v1/pet
```

### 4. Executar a Aplicação
Inicie o servidor de desenvolvimento do Expo:
```bash
npm start
```
*   Pressione `a` para abrir no emulador Android.
*   Pressione `i` para abrir no simulador iOS.
*   Pressione `w` para executar a versão web.
*   Escaneie o QR Code exibido no terminal utilizando o aplicativo **Expo Go** no seu celular.

---

## 👥 Equipe / Autoria
Arthur Graciani	RM561728

Gustavo Oliveira	RM566358

João Pedro Scarpin	RM565421

Lucas Hideki	RM565355

Wesley Andrade	RM563593
