import App from "App";
import CharacterDetail from "pages/CharacterDetail/CharacterDetail";
import CharactersList from "pages/CharactersList/CharactersList";
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
