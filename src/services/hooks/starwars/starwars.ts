import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCharacterById,
  getCharacters,
  getFilms,
  getPlanet,
} from "./helpers";
import {
  Character,
  CharacterResponse,
  CombinedPlanetResponse,
  FilmResponse,
  Planet,
} from "./types";

const useGetCharacters = (page: string): UseQueryResult<CharacterResponse> => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters(page),
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

const useGetPlanets = (planetIds: string[]): CombinedPlanetResponse => {
  return useQueries({
    queries: planetIds.map((planetId) => ({
      queryKey: ["planet", planetId],
      queryFn: () => getPlanet(planetId),
    })),
    combine: (results) => {
      return {
        data: results.every((result) => result.isSuccess)
          ? results.map((result) => result.data)
          : [],
        isSuccess:
          results.every((result) => result.isSuccess) &&
          !results.some((result) => result.isLoading),
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
    queryFn: () => getPlanet(planetId),
    enabled,
  });
};

const useGetFilms = (): UseQueryResult<FilmResponse> => {
  return useQuery({
    queryKey: ["films"],
    queryFn: () => getFilms(),
  });
};

export {
  useGetCharacters,
  useGetCharacterById,
  useGetPlanets,
  useGetPlanetById,
  useGetFilms,
};
