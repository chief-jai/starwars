import { http, HttpResponse } from "msw";
import { charactersResponse, filmsResponse, planet } from "./testData";

const getCharacters = http.get("https://swapi.dev/api/people/", () => {
  return HttpResponse.json({
    ...charactersResponse,
  });
});

const getCharactersById = http.get("https://swapi.dev/api/people/:id", () => {
  return HttpResponse.json({
    ...charactersResponse.results[0],
  });
});

const getPlanet = http.get("https://swapi.dev/api/planets/:id", () => {
  return HttpResponse.json({
    ...planet,
  });
});

const getFilms = http.get("https://swapi.dev/api/films/", () => {
  return HttpResponse.json({
    ...filmsResponse,
  });
});

export const starwarsHandlers = [
  getCharacters,
  getCharactersById,
  getPlanet,
  getFilms,
];
