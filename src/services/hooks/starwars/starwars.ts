import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCharacters, getPlanet } from "./helpers";
import { CharacterResponse, CombinedPlanetResponse } from "./types";

const useGetCharacters = (page: string): UseQueryResult<CharacterResponse> => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters(page),
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
        isSuccess: results.every((result) => result.isSuccess),
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
};

export { useGetCharacters, useGetPlanets };
