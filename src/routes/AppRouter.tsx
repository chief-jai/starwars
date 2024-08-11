import App from "App";
import CharacterDetail from "pages/CharacterDetail/CharacterDetail";
import CharactersList from "pages/CharactersList/CharactersList";
import FilmDetail from "pages/FilmDetail/FilmDetail";
import FilmsList from "pages/FilmsList/FilmsList";
import PlanetsList from "pages/PlanetsList/PlanetsList";
import StarshipsList from "pages/StarshipsList/StarshipsList";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: CharactersList,
      },
      {
        path: "/:characterId",
        Component: CharacterDetail,
      },
      {
        path: "/films",
        children: [
          {
            index: true,
            Component: FilmsList,
          },
          {
            path: "/films/:filmId",
            Component: FilmDetail,
          },
        ],
      },
      {
        path: "/planets",
        Component: PlanetsList,
      },
      {
        path: "/starships",
        Component: StarshipsList,
      },
    ],
  },
]);

export default appRouter;
