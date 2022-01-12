import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

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
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      container
    );
  });

  expect(container.textContent).toContain("Welcome to the Trivia Challenge");
});
