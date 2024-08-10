function getCharacterId(url: string) {
  return url.split("people")[1].replaceAll("/", "");
}

function getCharacterImageUrl(url: string) {
  return `./src/assets/characters/${getCharacterId(url)}.jpg`;
}

const capitalizeFirstCharacter = (string: string): string => {
  if (string.toLowerCase() === "n/a") {
    return "N/A";
  }

  const firstCharacter = string.charAt(0).toUpperCase();
  const remainingString = string.slice(1);

  return `${firstCharacter}${remainingString}`;
};

export { getCharacterImageUrl, getCharacterId, capitalizeFirstCharacter };
