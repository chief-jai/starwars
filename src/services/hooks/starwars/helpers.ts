import { CharacterResponse, Planet } from "./types";

const getCharacters = async (page: string) => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data: CharacterResponse = await response.json();
  return data;
};

const getPlanet = async (planetId: string) => {
  const response = await fetch(planetId);
  const data: Planet = await response.json();
  return data;
};

export { getCharacters, getPlanet };
