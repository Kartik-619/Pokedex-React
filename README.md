# 🎮 PokéFrame - Interactive Pokédex

A modern Pokédex application built with **React**, **GraphQL**, **Apollo Client**, and **PokeAPI**.

Search for your favorite Pokémon, view their information, explore their types and moves, and even play their iconic cries inside a Pokédex-inspired interface.

---

## ✨ Features

- 🔎 Search Pokémon by name or ID
- ⚡ Fetch data using GraphQL
- 🌐 Apollo Client integration
- 🎵 Play Pokémon cries
- 📊 Toggle additional Pokémon information
- 🎨 Modern Pokédex-inspired UI
- 📱 Responsive design
- ⚙️ Custom GraphQL backend

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Apollo Client
- Tailwind CSS

### Backend
- Apollo Server
- GraphQL

### APIs
- PokeAPI

---

## 📷 Preview

(Add screenshots here)

```md
assets/
├── home.png
├── search.png
└── info.png
```

Example:

```md
![Home](./assets/home.png)
```

---

## 🏗️ Project Architecture

```

React Frontend
↓
Apollo Client
↓
GraphQL Server (Apollo Server)
↓
PokeAPI

```

---

## 📂 Project Structure

```

src/
│
├── components/
│ ├── PokedexScreen.jsx
│ ├── PokedexControls.jsx
│ ├── PokedexSearchForm.jsx
│ └── PokeFrame.jsx
│
├── App.jsx
├── main.jsx
│
backend/
├── schema.js
└── server.js

```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pokeframe.git

cd pokeframe
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
npm install @apollo/server graphql
```

### 4. Run the GraphQL server

```bash
npm run server
```

Server runs on:

```text
http://localhost:4000/graphql
```

### 5. Start the frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🧠 GraphQL Query Example

```graphql
query GetPokemonData($nameOrId: String!) {
  pokemon(nameOrId: $nameOrId) {
    id
    name
    types
    moves

    sprites {
      front_default
    }
  }
}
```

---

## 🚀 Future Improvements

- ❤️ Favorites system
- 📈 Evolution chains
- 🔥 Type effectiveness calculator
- 🎲 Random Pokémon button
- 🌙 Dark mode
- 🏆 Pokémon comparison mode
- 📊 Detailed stats section
- 🔊 Better audio handling
- 🎞️ Animations

---

## 🎯 What I Learned

This project helped me strengthen my understanding of:

- React component architecture
- GraphQL fundamentals
- Apollo Client
- Apollo Server
- Query and resolver design
- API integration
- State management
- UI composition with Tailwind CSS

---

## 🙌 Acknowledgements

- PokeAPI → https://pokeapi.co/
- Apollo GraphQL → https://www.apollographql.com/
- Pokémon belongs to Nintendo, Game Freak, and The Pokémon Company.

---

## 📄 License

This project is built for educational and portfolio purposes.
