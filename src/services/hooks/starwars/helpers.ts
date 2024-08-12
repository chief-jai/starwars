import { SWAPI_URLS } from "./constants";
import {
  Character,
  CharacterResponse,
  Film,
  FilmResponse,
  Planet,
  PlanetResponse,
  StarshipResponse,
} from "./types";

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    return Promise.reject({
      status: response.status,
      message: response.statusText,
    });
  }

  const data = await response.json();
  return data;
};

const getCharacters = async (page: string, search: string) => {
  let url = `${SWAPI_URLS.base}/${SWAPI_URLS.people}/?${SWAPI_URLS.page}=${page}`;
  url = search ? `${url}&${SWAPI_URLS.search}=${search}` : url;

  return await fetchData<CharacterResponse>(url);
};

const getCharacterById = async (characterId: string) => {
  return await fetchData<Character>(
    `${SWAPI_URLS.base}/${SWAPI_URLS.people}/${characterId}`
  );
};

const getPlanets = async (page: string, search: string) => {
  let url = `${SWAPI_URLS.base}/${SWAPI_URLS.planets}/?${SWAPI_URLS.page}=${page}`;
  url = search ? `${url}&${SWAPI_URLS.search}=${search}` : url;

  return await fetchData<PlanetResponse>(url);
};

const getPlanetById = async (planetId: string) => {
  return await fetchData<Planet>(`${planetId}`);
};

const getFilms = async () => {
  return await fetchData<FilmResponse>(
    `${SWAPI_URLS.base}/${SWAPI_URLS.films}/`
  );
};

const getFilmById = async (filmId: string) => {
  return await fetchData<Film>(
    `${SWAPI_URLS.base}/${SWAPI_URLS.films}/${filmId}`
  );
};

const getStarships = async (page: string, search: string) => {
  let url = `${SWAPI_URLS.base}/${SWAPI_URLS.starships}/?${SWAPI_URLS.page}=${page}`;
  url = search ? `${url}&${SWAPI_URLS.search}=${search}` : url;

  return await fetchData<StarshipResponse>(url);
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
