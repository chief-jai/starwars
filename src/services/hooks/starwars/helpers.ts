import {
  Character,
  CharacterResponse,
  Film,
  FilmResponse,
  Planet,
  PlanetResponse,
  StarshipResponse,
} from "./types";

const getCharacters = async (page: string) => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data: CharacterResponse = await response.json();
  return data;
};

const getCharacterById = async (characterId: string) => {
  const response = await fetch(`https://swapi.dev/api/people/${characterId}`);
  const data: Character = await response.json();
  return data;
};

const getPlanets = async (page: string) => {
  const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data: PlanetResponse = await response.json();
  return data;
};

const getPlanetById = async (planetId: string) => {
  const response = await fetch(planetId);
  const data: Planet = await response.json();
  return data;
};

const getFilms = async () => {
  const response = await fetch("https://swapi.dev/api/films/");
  const data: FilmResponse = await response.json();
  return data;
};

const getFilmById = async (filmId: string) => {
  const response = await fetch(`https://swapi.dev/api/films/${filmId}`);
  const data: Film = await response.json();
  return data;
};

const getStarships = async (page: string) => {
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  const data: StarshipResponse = await response.json();
  return data;
};

export {
  getCharacters,
  getCharacterById,
  getPlanets,
  getPlanetById,
  getFilms,
  getFilmById,
  getStarships,
};
