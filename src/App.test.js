import Layout from "components/Layout";
import Home from "pages/Home";
import Quiz from "pages/Quiz";
import Results from "pages/Results";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "store/store";

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

it("routing shows Home as default component", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </Provider>,
      container
    );
  });

  expect(container.textContent).toContain("Welcome to the Trivia Challenge");
});
