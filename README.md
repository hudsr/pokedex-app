# 🎮 Pokédex App

A modern, interactive Pokédex application built with React, TypeScript, and Material-UI. Catch, collect, and manage your favorite Pokémon!

![Pokédex App Banner](https://img.shields.io/badge/Pokédex-App-DC0A2D?style=for-the-badge&logo=pokemon)

## ✨ Features

### 🔍 **Pokémon Discovery**

- Browse through **1,400+ Pokémon** from all generations
- **Real-time search** and filtering by name
- High-quality official artwork for each Pokémon
- Responsive grid layout that adapts to any screen size

### 🎯 **Pokémon Catching System**

- **Interactive catching mechanism** with realistic success/failure rates
- Visual feedback with shake animations during catch attempts
- Capture status tracking for each Pokémon

### 📱 **Collection Management**

- Personal collection to view all captured Pokémon
- **Release Pokémon** with confirmation dialogs
- Collection counter and statistics

### 🎨 **Modern UI/UX**

- Clean, Material Design interface
- Type-based color theming for each Pokémon
- Smooth navigation with React Router
- Mobile-first responsive design
- Loading states and error handling

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js installed on your machine:

- **Node.js**: v22.12.0 or higher (check with `node --version`)
- **npm**: Comes with Node.js

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd pokedex-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start exploring and catching Pokémon! 🎉

## 📋 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build the app for production             |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint to check code quality         |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ConfirmationModal/   # Modal for confirmations
│   ├── Error/              # Error state component
│   ├── Feedback/           # Generic feedback component
│   ├── Loading/            # Loading state component
│   └── TopBar/             # Navigation header
├── helpers/            # Utility functions
│   └── pokemonColor.tsx    # Pokémon type color mapping
├── routes/             # Route definitions
├── stores/             # Zustand state management
│   ├── collectionStore.ts  # Collection management
│   └── pokemonStore.ts     # Pokémon data & search
├── themes/             # Material-UI theme
├── App.tsx             # Main Pokémon list page
├── Collection.tsx      # User's collection page
├── Details.tsx         # Individual Pokémon details
└── main.tsx           # Application entry point
```

## 🎯 How to Use

### 1. **Browse Pokémon**

- The main page displays all available Pokémon
- Use the search bar to filter by name (e.g., "pikachu", "charizard")
- Click the "Reset" button to clear your search

### 2. **Catch Pokémon**

- Click on any Pokémon card to view details
- Click the "Catch Pokemon" button to attempt capture
- Watch the catching animation - success isn't guaranteed!
- Successfully caught Pokémon are added to your collection

### 3. **Manage Your Collection**

- Use the hamburger menu (☰) to navigate to "Your Collection"
- View all your captured Pokémon
- Release Pokémon if needed (with confirmation)

### 4. **Navigate**

- **All Pokémon**: Browse the complete Pokédex
- **Your Collection**: View captured Pokémon
- Click any Pokémon card to see detailed information

## 🛠️ Tech Stack

| Technology       | Purpose                              |
| ---------------- | ------------------------------------ |
| **React 19**     | Frontend framework                   |
| **TypeScript**   | Type safety and developer experience |
| **Material-UI**  | Component library and design system  |
| **Zustand**      | Lightweight state management         |
| **SWR**          | Data fetching and caching            |
| **React Router** | Client-side routing                  |
| **Vite**         | Build tool and development server    |

## 🌐 API Integration

- **Data Source**: [PokéAPI](https://pokeapi.co/) - The RESTful Pokémon API
- **Images**: Official Pokémon artwork from PokéAPI sprites
- **Caching**: SWR provides automatic caching and revalidation

## 🎨 Design Features

- **Type-based Colors**: Each Pokémon's interface adapts to its primary type color
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Loading states, catching animations, and transitions
- **Accessibility**: ARIA labels and keyboard navigation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Live Demo

Try the app: [Pokédex App Demo](#) _(Add your deployment URL here)_

---

**Happy Pokémon hunting!** 🎯✨

_"Gotta catch 'em all!"_ - Professor Oak
