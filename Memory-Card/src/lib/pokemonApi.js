const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

const toTitleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export async function fetchPokemonCards(limit = 12) {
  const listResponse = await fetch(`${POKEMON_API_URL}?limit=${limit}`);

  if (!listResponse.ok) {
    throw new Error("Failed to fetch pokemon list");
  }

  const listData = await listResponse.json();
  const pokemonResponses = await Promise.all(
    listData.results.map((pokemon) => fetch(pokemon.url)),
  );

  const hasError = pokemonResponses.some((response) => !response.ok);

  if (hasError) {
    throw new Error("Failed to fetch pokemon details");
  }

  const pokemonDetails = await Promise.all(
    pokemonResponses.map((response) => response.json()),
  );

  return pokemonDetails.map((pokemon) => {
    const types = pokemon.types
      .map((item) => toTitleCase(item.type.name))
      .join(" • ");

    return {
      id: pokemon.id,
      name: toTitleCase(pokemon.name),
      subtitle: types,
      image:
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default,
    };
  });
}
