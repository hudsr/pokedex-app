// Pokemon type color mapping
const POKEMON_TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  stellar: "#40B5A8",
  unknown: "#68A090",
};

/**
 * Returns a hexadecimal color based on Pokemon type
 * @param types - Single Pokemon type name or array of types (max 2)
 * @returns Hexadecimal color string of the first type
 */
export function getPokemonTypeColor(types: string | string[]): string {
  // If array is passed, use the first type
  const pokemonType = Array.isArray(types) ? types[0] : types;

  // Convert to lowercase for case-insensitive matching
  const normalizedType = pokemonType.toLowerCase();

  // Return color or default if type not found
  return POKEMON_TYPE_COLORS[normalizedType] || "#68A090";
}
