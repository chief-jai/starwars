function getId(url: string, delimiter: string) {
  return url.split(delimiter)[1].replaceAll("/", "");
}

function getCharacterImageUrl(url: string) {
  return `./src/assets/characters/${getId(url, "people")}.jpg`;
}

function getFilmImageUrl(url: string) {
  return `./src/assets/films/${getId(url, "films")}.jpg`;
}

const capitalizeFirstCharacter = (string?: string): string => {
  if (!string || string.toLowerCase() === "n/a") {
    return "N/A";
  }

  const firstCharacter = string.charAt(0).toUpperCase();
  const remainingString = string.slice(1);

  return `${firstCharacter}${remainingString}`;
};

export {
  getCharacterImageUrl,
  getId,
  getFilmImageUrl,
  capitalizeFirstCharacter,
};
