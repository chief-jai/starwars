import { setupWorker } from "msw/browser";
import { starwarsHandlers } from "services/hooks/starwars/mockHandlers";

export const worker = setupWorker(...starwarsHandlers);
