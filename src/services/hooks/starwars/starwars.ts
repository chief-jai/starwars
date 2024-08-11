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

const useGetCharacters = (page: string): UseQueryResult<CharacterResponse> => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters(page),
  });
};

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
      };
    },
  });
};

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

const useGetPlanets = (page: string): UseQueryResult<PlanetResponse> => {
  return useQuery({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(page),
  });
};

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
      };
    },
  });
};

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

const useGetFilms = (): UseQueryResult<FilmResponse> => {
  return useQuery({
    queryKey: ["films"],
    queryFn: () => getFilms(),
  });
};

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

const useGetStarships = (page: string): UseQueryResult<StarshipResponse> => {
  return useQuery({
    queryKey: ["starships", page],
    queryFn: () => getStarships(page),
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
