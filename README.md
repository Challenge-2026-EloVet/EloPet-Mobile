# 🐾 EloPet

> Aplicativo mobile desenvolvido em **React Native** com **Expo** para gestão integrada da saúde de animais de estimação, conectando tutores a clínicas veterinárias parceiras e oferecendo ferramentas de monitoramento diário.

---

## 📋 Visão Geral do Projeto

O **EloPet** é um projeto acadêmico desenvolvido com o objetivo de facilitar a rotina de cuidados de tutores de cães e gatos. A aplicação centraliza informações vitais sobre o pet, auxilia no acompanhamento preventivo por meio de um assistente de triagem inteligente, e facilita a busca por clínicas veterinárias credenciadas com suporte a geolocalização e rotas.

---

## 🛠️ Tecnologias e Stack Utilizada

O projeto foi construído utilizando tecnologias modernas do ecossistema React Native:

*   **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
*   **Banco de Dados & Armazenamento:** [Firebase Firestore](https://firebase.google.com/docs/firestore) para gerenciamento em tempo real do prontuário dos pets.
*   **Notificações:** Módulo integrado para envio de alertas e notificações push locais.
*   **Geolocalização & Mapas:** Permissões de localização do usuário para simulação de rotas até as clínicas credenciadas.
*   **Navegação:** [React Navigation](https://reactnavigation.org/) (Bottom Tabs e Native Stack v7) com suporte a tema adaptativo.
*   **Gerenciamento de Estado e Cache:** [TanStack React Query](https://tanstack.com/query) (v5)
*   **Requisições HTTP:** [Axios](https://axios-http.com/)
*   **Armazenamento Seguro:** `expo-secure-store` (com fallback para `localStorage` no ambiente web).
*   **Estilização & Tema Dinâmico:** Suporte nativo ao tema do Sistema Operacional (`useColorScheme`, `userInterfaceStyle: "automatic"` no `app.json`), alternando automaticamente entre os modos Claro e Escuro mantendo a paleta institucional em tons de verde (`#185A43`, `#A3D9C9`).

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
    *   Listagem integrada de animais de estimação com ações rápidas de edição e remoção (soft delete/sync Firestore).
    *   Modal para atualização de dados cadastrais do responsável.
    *   **Modal "Sobre o App":** Exibição da versão publicada do aplicativo e do **hash do commit de referência** da versão (`EXPO_PUBLIC_GIT_COMMIT_HASH` / `$EAS_BUILD_GIT_COMMIT_HASH`), garantindo rastreabilidade do build.
4.  **`RegisterPetScreen.tsx`:**
    *   Formulário unificado para cadastro ou edição de pets (suporta cães, gatos e outras espécies).
    *   Coleta de dados como raça, idade aproximada, data de nascimento, sexo e status de castração.
    *   Invalidação automática de cache via React Query para atualização instantânea nas demais telas.
5.  **`ClinicSearchScreen.tsx`:**
    *   Busca interativa por clínicas parceiras na rede credenciada.
    *   Filtros por especialidades (Ortopedia, Cardiologia, Acessibilidade) e distância.
    *   Mapa interativo simulado com pinos de localização, solicitação de permissão de geolocalização do usuário e integração para traçado de rotas.
6.  **`ChatScreen.tsx`:**
    *   Canal de atendimento com o "Assistente Elo Vet".
    *   Respostas rápidas interativas para relatar o apetite, nível de energia e bem-estar diário do pet.

---

## ⚙️ Arquitetura de Serviços e Dados

A camada de serviços centraliza a comunicação com a API backend e os serviços em nuvem:
*   **Backend Java:** Configuração dinâmica de cabeçalhos de autorização (`Bearer Token`), endpoints isolados para Autenticação, Gestão de Usuário/Responsável e CRUD de Pets.
*   **Firebase Firestore:** Utilizado para armazenamento estruturado e sincronização em tempo real do prontuário detalhado dos pets (histórico médico, vacinas e ocorrências).
*   **Notificações Push:** Implementação de avisos para lembrar o tutor sobre horários de medicamentos, consultas e cuidados diários.
*   **Sincronização de Tema:** O `NavigationContainer` consome o tema escuro/claro nativo do dispositivo (`DarkTheme` e `DefaultTheme` customizados), garantindo legibilidade e alto contraste no sistema operacional do usuário.

---

## 🚀 Build, CI/CD e Distribuição

O projeto conta com automação de build na nuvem e distribuição contínua:
*   **EAS Build (Expo Application Services):** Utilizado para gerar os pacotes de instalação da aplicação (`.apk` para Android) diretamente na nuvem do Expo.
*   **Captura de Hash do Commit:** Durante o build na nuvem do EAS, a variável `$EAS_BUILD_GIT_COMMIT_HASH` é injetada para alimentar a tela "Sobre o App" com a identificação exata do commit de lançamento.
*   **Gestão de Segredos (`EAS Secrets`):** As chaves sensíveis de API, endpoints Java e conexões com o Firebase são injetadas de forma segura no processo de build, mantendo as credenciais protegidas fora do repositório público.
*   **Firebase App Distribution:** Plataforma utilizada para a distribuição automatizada das versões de teste/homologação do APK diretamente para a equipe e homologadores.

---

## 💻 Como Executar o Projeto

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
Crie um arquivo `.env` na raiz do projeto baseando-se nas rotas da sua API backend em Java, credenciais do Firebase e variável do Git:
```env
EXPO_PUBLIC_GIT_COMMIT_HASH=$EAS_BUILD_GIT_COMMIT_HASH
```

### 4. Executar a Aplicação
Inicie o servidor de desenvolvimento do Expo limpando o cache:
```bash
npx expo start -c
```
* Pressione `a` para abrir no emulador Android.
* Pressione `i` para abrir no simulador iOS.
* Pressione `w` para executar a versão web.
* Escaneie o QR Code exibido no terminal utilizando o aplicativo **Expo Go** no seu celular.

---

### 👥 Equipe / Autoria

*   Arthur Graciani — RM561728
*   Gustavo Oliveira — RM566358
*   João Pedro Scarpin — RM565421
*   Lucas Hideki — RM565355
*   Wesley Andrade — RM563593
