import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

const queryClientOptions = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: () => null,
    warn: () => null,
    error: () => null,
  },
};

/**
 * Renders the provided React element within a QueryClientProvider component and
 * initializes the user. By default, this is wrapped in a {@link QueryClientProvider}.
 *
 * @param {React.ReactElement} ui - The React element to render.
 * @param {RenderOptions} [options] - Optional rendering options to customize the rendering.
 * @returns - An object containing the result of rendering and the user for interacting with the UI.
 */
function customRender(ui: React.ReactElement, options?: RenderOptions) {
  const queryClient = new QueryClient(queryClientOptions);
  const rendered = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    options
  );
  return {
    user: userEvent.setup(),
    ...rendered,
    rerender: (rerenderUi: React.ReactElement) => {
      customRender(rerenderUi, {
        container: rendered.container,
      });
    },
  };
}

export { customRender as render };
