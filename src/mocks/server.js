import { setupServer } from "msw/node";

import { handlers } from "./handlers";

// const { TextDecoder, TextEncoder } = require("util");

// global.TextEncoder = TextEncoder;

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
