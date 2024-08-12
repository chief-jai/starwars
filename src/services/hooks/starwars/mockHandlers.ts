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

const getCharactersError = http.get("https://swapi.dev/api/people/", () => {
  return HttpResponse.error();
});

const getCharactersEmpty = http.get("https://swapi.dev/api/people/", () => {
  return HttpResponse.json({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
});

const getCharactersById = http.get("https://swapi.dev/api/people/:id", () => {
  return HttpResponse.json({
    ...charactersResponse.results[0],
  });
});

const getCharacterByIdError = http.get(
  "https://swapi.dev/api/people/:id",
  () => {
    return HttpResponse.error();
  }
);

const getPlanets = http.get("https://swapi.dev/api/planets/", () => {
  return HttpResponse.json({
    ...planetResponse,
  });
});

const getPlanetsError = http.get("https://swapi.dev/api/planets/", () => {
  return HttpResponse.error();
});

const getPlanetsEmpty = http.get("https://swapi.dev/api/planets/", () => {
  return HttpResponse.json({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
});

const getPlanetById = http.get("https://swapi.dev/api/planets/:id", () => {
  return HttpResponse.json({
    ...planetResponse.results[0],
  });
});

const getPlanetByIdError = http.get("https://swapi.dev/api/planets/:id", () => {
  return HttpResponse.error();
});

const getFilms = http.get("https://swapi.dev/api/films/", () => {
  return HttpResponse.json({
    ...filmsResponse,
  });
});

const getFilmsError = http.get("https://swapi.dev/api/films/", () => {
  return HttpResponse.error();
});

const getFilmsEmpty = http.get("https://swapi.dev/api/films/", () => {
  return HttpResponse.json({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
});

const getFilmsById = http.get("https://swapi.dev/api/films/:id", () => {
  return HttpResponse.json({
    ...filmsResponse.results[0],
  });
});

const getFilmByIdError = http.get("https://swapi.dev/api/films/:id", () => {
  return HttpResponse.error();
});

const getStarships = http.get("https://swapi.dev/api/starships/", () => {
  return HttpResponse.json({
    ...starshipsResponse,
  });
});

const getStarshipsEmpty = http.get("https://swapi.dev/api/starships/", () => {
  return HttpResponse.json({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
});

const getStarshipsError = http.get("https://swapi.dev/api/starships/", () => {
  return HttpResponse.error();
});

export {
  getCharactersEmpty,
  getCharactersError,
  getCharacterByIdError,
  getPlanetsEmpty,
  getPlanetsError,
  getPlanetByIdError,
  getFilmsEmpty,
  getFilmsError,
  getFilmByIdError,
  getStarshipsEmpty,
  getStarshipsError,
};

export const starwarsHandlers = [
  getCharacters,
  getCharactersById,
  getPlanets,
  getPlanetById,
  getFilms,
  getFilmsById,
  getStarships,
];
