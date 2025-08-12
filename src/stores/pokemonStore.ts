import { create } from "zustand";
import useSWR from "swr";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
    };
  };
}

interface PokemonStore {
  // State
  searchTerm: string;

  // Actions
  setSearchTerm: (term: string) => void;
  resetSearch: () => void;

  // Data fetching hooks
  usePokemonList: () => {
    data: { results: Pokemon[] } | undefined;
    error: Error | undefined;
    isLoading: boolean;
    filteredPokemon: Pokemon[];
    displayedPokemon: Pokemon[];
  };

  usePokemonDetails: (name: string) => {
    data: PokemonDetails | undefined;
    error: Error | undefined;
    isLoading: boolean;
  };

  // Utility functions
  getPokemonId: (url: string) => number;
  getPokemonImageUrl: (id: number) => string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePokemonStore = create<PokemonStore>((set, get) => ({
  // State
  searchTerm: "",

  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  resetSearch: () => set({ searchTerm: "" }),

  // Data fetching hooks
  usePokemonList: () => {
    const { searchTerm } = get();
    const { data, error, isLoading } = useSWR(
      "https://pokeapi.co/api/v2/pokemon?limit=1400",
      fetcher
    );

    const filteredPokemon =
      searchTerm.trim() && data?.results
        ? data.results.filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data?.results || [];

    const displayedPokemon = filteredPokemon.slice(0, 30);

    return {
      data,
      error,
      isLoading,
      filteredPokemon,
      displayedPokemon,
    };
  },

  usePokemonDetails: (name: string) => {
    const { data, error, isLoading } = useSWR(
      name ? `https://pokeapi.co/api/v2/pokemon/${name}` : null,
      fetcher
    );

    return { data, error, isLoading };
  },

  // Utility functions
  getPokemonId: (url: string) => {
    const segments = url.split("/");
    return parseInt(segments[segments.length - 2]);
  },

  getPokemonImageUrl: (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
}));

export default usePokemonStore;
