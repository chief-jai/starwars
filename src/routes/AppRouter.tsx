import App from "App";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: () => <h1>Characters</h1>,
      },
      {
        path: "/planets",
        Component: () => <h1>Planets</h1>,
      },
      {
        path: "/starships",
        Component: () => <h1>Starships</h1>,
      },
    ],
  },
]);

export default appRouter;
