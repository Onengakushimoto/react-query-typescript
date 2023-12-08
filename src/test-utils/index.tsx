import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  // setLogger,
} from "@tanstack/react-query";
import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";

import { generateQueryClient } from "../react-query/queryClient";
import { theme } from "../theme";

// make this a function for unique queryClient per test
const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  // options.logger = {
  //   log: (...args) => {
  //     // Log debugging information
  //   },
  //   warn: (...args) => {
  //     // Log warning
  //   },
  //   error: (...args) => {
  //     // Log error
  //   },
  // },
  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    </ChakraProvider>,
  );
}

// wrapper for testing  custom hooks
// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createQueryClientWrapper = (): React.FC => {
//   const queryClient = generateTestQueryClient();
//   return function ({ children }) {
//     return (
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     );
//   };
// };

export const createQueryClientWrapper = ({ children }) => {
  const queryClient = generateTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
