import { setupServer } from "msw/node";
import { starwarsHandlers } from "services/hooks/starwars/mockHandlers";

export const server = setupServer(...starwarsHandlers);
