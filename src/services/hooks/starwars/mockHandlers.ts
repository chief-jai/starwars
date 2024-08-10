import { http, HttpResponse } from "msw";
import { charactersResponse, planet } from "./testData";

const getCharacters = http.get("https://swapi.dev/api/people/", () => {
  return HttpResponse.json({
    ...charactersResponse,
  });
});

const getPlanet = http.get("https://swapi.dev/api/planets/:id", () => {
  return HttpResponse.json({
    ...planet,
  });
});

export const starwarsHandlers = [getCharacters, getPlanet];
