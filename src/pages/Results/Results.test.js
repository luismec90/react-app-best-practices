import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/store";
import Results from "./Results";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("shows welcome message", () => {
  act(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>,
      container
    );
  });

  expect(container.textContent).toContain("Play again?");
});
