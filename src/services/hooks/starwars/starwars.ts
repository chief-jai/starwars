import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCharacterById,
  getCharacters,
  getFilmById,
  getFilms,
  getPlanetById,
  getPlanets,
  getStarships,
} from "./helpers";
import {
  Character,
  CharacterResponse,
  CombinedCharacterResponse,
  CombinedPlanetResponse,
  Film,
  FilmResponse,
  Planet,
  PlanetResponse,
  StarshipResponse,
} from "./types";

/**
 * Fetches characters from the Star Wars API
 *
 * @param {string} page
 * @return {*}  {UseQueryResult<CharacterResponse>}
 */
const useGetCharacters = (
  page: string,
  search: string
): UseQueryResult<CharacterResponse> => {
  return useQuery({
    queryKey: ["characters", page, search],
    queryFn: () => getCharacters(page, search),
  });
};

/**
 * Fetches characters in parallel from the Star Wars API
 *
 * @param {string[]} characterIds
 * @return {*}  {CombinedCharacterResponse}
 */
const useGetCharactersInParallel = (
  characterIds: string[]
): CombinedCharacterResponse => {
  return useQueries({
    queries: characterIds.map((characterId) => ({
      queryKey: ["character", characterId],
      queryFn: () => getCharacterById(characterId),
    })),
    combine: (results) => {
      return {
        data: results.every((result) => result.isSuccess)
          ? results.map((result) => result.data)
          : [],
        isSuccess: results.every((result) => result.isSuccess),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });
};

/**
 * Fetches a character by ID from the Star Wars API
 *
 * @param {string} characterId
 * @param {boolean} enabled
 * @return {*}  {UseQueryResult<Character>}
 */
const useGetCharacterById = (
  characterId: string,
  enabled: boolean
): UseQueryResult<Character> => {
  return useQuery({
    queryKey: ["character", characterId],
    queryFn: () => getCharacterById(characterId),
    enabled,
  });
};

/**
 * Fetches planets from the Star Wars API
 *
 * @param {string} page
 * @return {*}  {UseQueryResult<PlanetResponse>}
 */
const useGetPlanets = (
  page: string,
  search: string
): UseQueryResult<PlanetResponse> => {
  return useQuery({
    queryKey: ["planets", page, search],
    queryFn: () => getPlanets(page, search),
  });
};

/**
 * Fetches planets in parallel from the Star Wars API
 *
 * @param {string[]} planetIds
 * @return {*}  {CombinedPlanetResponse}
 */
const useGetPlanetsInParallel = (
  planetIds: string[]
): CombinedPlanetResponse => {
  return useQueries({
    queries: planetIds.map((planetId) => ({
      queryKey: ["planet", planetId],
      queryFn: () => getPlanetById(planetId),
    })),
    combine: (results) => {
      return {
        data: results.every((result) => result.isSuccess)
          ? results.map((result) => result.data)
          : [],
        isSuccess: results.every((result) => result.isSuccess),
        isLoading: results.some((result) => result.isLoading),
        isFetching: results.some((result) => result.isFetching),
        isError: results.some((result) => result.isError),
      };
    },
  });
};

/**
 * Fetches a planet by ID from the Star Wars API
 *
 * @param {string} planetId
 * @param {boolean} enabled
 * @return {*}  {UseQueryResult<Planet>}
 */
const useGetPlanetById = (
  planetId: string,
  enabled: boolean
): UseQueryResult<Planet> => {
  return useQuery({
    queryKey: ["planet", planetId],
    queryFn: () => getPlanetById(planetId),
    enabled,
  });
};

/**
 * Fetches films from the Star Wars API
 *
 * @return {*}  {UseQueryResult<FilmResponse>}
 */
const useGetFilms = (): UseQueryResult<FilmResponse> => {
  return useQuery({
    queryKey: ["films"],
    queryFn: () => getFilms(),
  });
};

/**
 * Fetches a film by ID from the Star Wars API
 *
 * @param {string} filmId
 * @param {boolean} enabled
 * @return {*}  {UseQueryResult<Film>}
 */
const useGetFilmById = (
  filmId: string,
  enabled: boolean
): UseQueryResult<Film> => {
  return useQuery({
    queryKey: ["film", filmId],
    queryFn: () => getFilmById(filmId),
    enabled,
  });
};

/**
 * Fetches starships from the Star Wars API
 *
 * @param {string} page
 * @return {*}  {UseQueryResult<StarshipResponse>}
 */
const useGetStarships = (
  page: string,
  search: string
): UseQueryResult<StarshipResponse> => {
  return useQuery({
    queryKey: ["starships", page, search],
    queryFn: () => getStarships(page, search),
  });
};

export {
  useGetCharacters,
  useGetCharacterById,
  useGetCharactersInParallel,
  useGetPlanets,
  useGetPlanetsInParallel,
  useGetPlanetById,
  useGetFilms,
  useGetFilmById,
  useGetStarships,
};
