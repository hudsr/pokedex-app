import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Pokemon {
    id: number;
    name?: string;
    sprites?: {
        other: {
            dream_world: {
                front_default: string;
                front_female: string | null;
            };
        };
    };
}

interface CollectionStore {
  capturedPokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemon: Pokemon) => void;
  isPokemonCaptured: (pokemonId: number) => boolean;
}

const useCollectionStore = create<CollectionStore>()(
  persist(
    (set, get) => ({
      capturedPokemons: [],
      addPokemon: (pokemon) => set((state) => ({
        capturedPokemons: [...state.capturedPokemons, pokemon],
      })),
      removePokemon: (pokemon) => set((state) => ({
        capturedPokemons: state.capturedPokemons.filter((p) => p.id !== pokemon.id),
      })),
      isPokemonCaptured: (pokemonId) => {
        return get().capturedPokemons.some((p) => p.id === pokemonId);
      },
    }),
    {
      name: 'pokemon-collection',
      version: 1,
    }
  )
);

export default useCollectionStore;