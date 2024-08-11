import { http, HttpResponse } from "msw";
import {
  charactersResponse,
  filmsResponse,
  planetResponse,
  starshipsResponse,
} from "./testData";

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

const getPlanets = http.get("https://swapi.dev/api/planets/", () => {
  return HttpResponse.json({
    ...planetResponse,
  });
});

const getPlanetById = http.get("https://swapi.dev/api/planets/:id", () => {
  return HttpResponse.json({
    ...planetResponse.results[0],
  });
});

const getFilms = http.get("https://swapi.dev/api/films/", () => {
  return HttpResponse.json({
    ...filmsResponse,
  });
});

const getFilmsById = http.get("https://swapi.dev/api/films/:id", () => {
  return HttpResponse.json({
    ...filmsResponse.results[0],
  });
});

const getStarships = http.get("https://swapi.dev/api/starships/", () => {
  return HttpResponse.json({
    ...starshipsResponse,
  });
});

export const starwarsHandlers = [
  getCharacters,
  getCharactersById,
  getPlanets,
  getPlanetById,
  getFilms,
  getFilmsById,
  getStarships,
];
