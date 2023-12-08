import { setupWorker } from "msw";

import { handlers } from "./handlers";

export const serviceWorker = setupWorker(...handlers);
