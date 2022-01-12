import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/store";
import Quiz from "./Quiz";

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

it("renders first question", async () => {
  const fakeQuestions = {
    response_code: 0,
    results: [
      {
        category: "Entertainment: Video Games",
        type: "boolean",
        difficulty: "hard",
        question: "In &quot;The Sims&quot; series, the most members in a household you can have is 8.",
        correct_answer: "True",
        incorrect_answers: ["False"],
      },
      {
        category: "History",
        type: "boolean",
        difficulty: "hard",
        question: "Joseph Stalin&#039;s real name was Ioseb Bessarionis dze Dzugashvili.",
        correct_answer: "True",
        incorrect_answers: ["False"],
      },
      {
        category: "Entertainment: Video Games",
        type: "boolean",
        difficulty: "hard",
        question:
          "TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Entertainment: Music",
        type: "boolean",
        difficulty: "hard",
        question: "The song &quot;Mystery Train&quot; was released by artist &quot;Little Junior&#039;s Blue Flames&quot; in 1953.",
        correct_answer: "True",
        incorrect_answers: ["False"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "hard",
        question: "The IBM PC used an Intel 8008 microprocessor clocked at 4.77 MHz and 8 kilobytes of memory.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "General Knowledge",
        type: "boolean",
        difficulty: "hard",
        question: "In Scandinavian languages, the letter &Aring; means river.",
        correct_answer: "True",
        incorrect_answers: ["False"],
      },
      {
        category: "Geography",
        type: "boolean",
        difficulty: "hard",
        question: "Switzerland has four national languages, English being one of them.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science & Nature",
        type: "boolean",
        difficulty: "hard",
        question: "The chemical element Lithium is named after the country of Lithuania.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Mathematics",
        type: "boolean",
        difficulty: "hard",
        question:
          "L&#039;H&ocirc;pital was the mathematician who created the homonymous rule that uses derivatives to evaluate limits with indeterminations.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Entertainment: Film",
        type: "boolean",
        difficulty: "hard",
        question: "YouTube personality Jenna Marbles served as an executive producer of the film Maximum Ride (2016).",
        correct_answer: "True",
        incorrect_answers: ["False"],
      },
    ],
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeQuestions),
    })
  );
  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Quiz />
        </BrowserRouter>
      </Provider>,
      container
    );
  });

  expect(container.textContent).toContain('Video GamesIn "The Sims" series, the most members in a household you can have is 8');

  global.fetch.mockRestore();
});
