interface BaseResponse {
  count: number;
  next: string | null;
  previous: string | null;
}

interface CharacterResponse extends BaseResponse {
  results: Character[];
}

interface CombinedCharacterResponse {
  data: Character[];
  isSuccess: boolean;
  isLoading: boolean;
}

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface PlanetResponse extends BaseResponse {
  results: Planet[];
}

interface CombinedPlanetResponse {
  data: Planet[];
  isSuccess: boolean;
  isLoading: boolean;
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface FilmResponse extends BaseResponse {
  results: Film[];
}

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface StarshipResponse extends BaseResponse {
  results: Starship[];
}

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export type {
  CharacterResponse,
  CombinedCharacterResponse,
  Character,
  PlanetResponse,
  CombinedPlanetResponse,
  Planet,
  FilmResponse,
  Film,
  StarshipResponse,
  Starship,
};
