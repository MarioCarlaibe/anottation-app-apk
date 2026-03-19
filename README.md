# Anottation App APK

Aplicativo mobile de anotações desenvolvido com **React Native + Expo**, com foco em simplicidade e produtividade.

## ✨ Funcionalidades

- Criar anotações rapidamente
- Categorizar notas (Geral, Trabalho, Estudo)
- Marcar nota como concluída
- Excluir nota
- Persistência local com `AsyncStorage`

## 🧱 Stack

- **Expo SDK 54**
- **React Native 0.81**
- **Expo Router** (roteamento por arquivos)
- **NativeWind + TailwindCSS** (estilização)
- **AsyncStorage** (armazenamento local)

## 📁 Estrutura principal

```text
app/
   (tabs)/
      index.tsx          # Entrada da Home no router
src/
   screens/
      Home.js            # Tela principal de anotações
   components/
      NoteItem.js        # Card de cada anotação
   storage/
      notesStorage.js    # Camada de persistência local
```

## 🚀 Como executar

### Pré-requisitos

- Node.js LTS
- npm
- Expo CLI (via `npx`)

### Instalação

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run start
```

Atalhos disponíveis:

```bash
npm run android
npm run ios
npm run web
```

## ✅ Qualidade do projeto

Validar lint:

```bash
npm run lint
```

Validar compatibilidade do Expo SDK/dependências:

```bash
npx expo-doctor
```

## 🔧 Scripts

- `npm run start` — inicia o projeto com Expo
- `npm run android` — abre no Android
- `npm run ios` — abre no iOS
- `npm run web` — abre no navegador
- `npm run lint` — executa lint do Expo
- `npm run reset-project` — reseta a base inicial do app

## 🧠 Como funciona a persistência

As notas são salvas localmente usando a chave `NOTES` no `AsyncStorage`. O fluxo principal:

1. A tela Home carrega notas ao iniciar (`getNotes`)
2. Ao criar/editar estado local, os dados são persistidos com `saveNotes`
3. Na próxima abertura do app, as notas são restauradas automaticamente

## 📌 Roadmap sugerido

- Editar nota existente
- Busca/filtro por categoria
- Ordenação por data/criação
- Exportação de notas

## 🤝 Contribuição

Sugestões e melhorias são bem-vindas. Você pode abrir uma issue ou PR com:

- descrição da melhoria
- motivação
- impacto esperado no app

## 📄 Licença

Defina aqui a licença do projeto (ex.: MIT) quando desejar publicar oficialmente.
