# Pokédex Lite

Pokédex Lite is a modern, responsive React web application that allows users to explore Pokémon, filter them by type, search by name, and curate a list of their favorite Pokémon. It interfaces directly with the [PokéAPI](https://pokeapi.co/) to provide comprehensive details about each Pokémon.

## Table of Contents
- [Getting Started](#getting-started)
- [Technologies & Libraries Used](#technologies--libraries-used)
- [Features](#features)
- [Challenges & Solutions](#challenges--solutions)

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AchalRaj0709/pokedex.git
   cd pokedex
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will start, and you can view it in your browser at `http://localhost:5173/` (or the port specified in your terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Technologies & Libraries Used

- **React (with Vite):** 
  - *Why:* React provides a fantastic component-driven architecture for interactive UIs. Vite is used as the build tool over Create React App because it offers significantly faster Hot Module Replacement (HMR) and an optimized build process.
- **Tailwind CSS:** 
  - *Why:* Tailwind CSS allows for rapid UI development using utility classes directly in the markup. It ensures a highly responsive and modern design (e.g., grids, hover states, animations) without the need for large, custom CSS files.
- **Lucide React:**
  - *Why:* Provides crisp, lightweight, and customizable SVG icons (such as the Heart icon and Chevron arrows).
- **PokéAPI:**
  - *Why:* A reliable, comprehensive, and free RESTful API providing all necessary Pokémon data including stats, abilities, and sprites.
- **LocalStorage API:**
  - *Why:* Used for persisting user favorites natively in the browser without needing a complex backend database or authentication flow.

---

## Features

- **Responsive Grid:** View Pokémon in a grid adapting to Mobile, Tablet, and Desktop screens.
- **Search & Filter:** Search in real-time by Pokémon name or filter by specific elemental types (Fire, Water, Grass, etc.).
- **Favorites System:** Toggle Pokémon as favorites to save them persistently across browser reloads. You can click the "Favorites" button in the navigation bar to exclusively view your curated list.
- **Detailed Modals:** Click on any Pokémon to view a detailed popup containing high-resolution artwork, base stats with animated progress bars, and abilities.
- **Pagination:** Seamlessly traverse through the Pokédex using the next and previous actions.

---

## Challenges & Solutions

**1. Managing Asynchronous API Calls & Data Mapping**
- *Challenge:* The main PokéAPI endpoint `/pokemon` only returns a name and a URL to fetch more details. To show images and types on the main grid, a secondary fetch is required for *each* Pokémon, which could cause race conditions or sluggish rendering.
- *Solution:* Used `Promise.all()` to resolve all secondary fetches simultaneously before updating the state. This ensures the UI only updates once the full dataset for the current page is ready.

**2. Persisting State with LocalStorage (Hydration bugs)**
- *Challenge:* Initially, when utilizing `useEffect` to load favorites from localStorage, the initial state of the React component was an empty array `[]`. A secondary `useEffect` immediately synchronized this empty array back to localStorage, wiping the user's saved favorites upon a page refresh.
- *Solution:* Leveraged lazy initial state in React by passing a function to `useState(() => getFavorites())`. This ensures the state is synchronously initialized with the data from localStorage on the very first render, preventing accidental overwrites.

**3. Implementing Type Filtering with Pagination**
- *Challenge:* PokéAPI does not support combined querying (e.g., "limit=20 & offset=0 & type=fire"). Fetching a specific type returns a massive, unpaginated array of Pokémon of that type.
- *Solution:* Abstracted the filtering logic locally. When a user selects a type, the app fetches all Pokémon of that type, stores the count, and slices the array based on the current local `offset` and `limit`, creating a custom pagination experience that mimics the API's default behavior seamlessly.
