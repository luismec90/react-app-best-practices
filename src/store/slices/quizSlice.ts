import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export interface Question {
  index: number;
  category: string;
  question: string;
  correct_answer: boolean;
  user_answer: boolean | null;
}
export interface UserAnswer {
  index: number;
  user_answer: boolean | null;
}
export interface QuizState {
  loading: boolean;
  hasErrors: boolean;
  questions: Question[];
}

const initialState: QuizState = {
  loading: false,
  hasErrors: false,
  questions: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getQuestions: (state) => {
      state.loading = true;
    },
    getQuestionsSuccess: (state, { payload }: { payload: Question[] }) => {
      state.questions = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getQuestionsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    setUserAnswer: (state, { payload }: { payload: UserAnswer }) => {
      state.questions = state.questions.map((question) =>
        question.index === payload.index ? { ...question, user_answer: payload.user_answer } : question
      );
    },
  },
});

// Export actions
export const { setUserAnswer, getQuestions, getQuestionsSuccess, getQuestionsFailure } = quizSlice.actions;

// Export selectors
export const selectQuiz = (state: RootState) => state.quiz;

export default quizSlice.reducer;

// Asynchronous thunk action
export function fetchQuestions() {
  return async (dispatch: any) => {
    dispatch(getQuestions());

    try {
      const url = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";
      const response = await fetch(url);
      const data = await response.json();
      if (data?.response_code === 0) {
        dispatch(
          getQuestionsSuccess(
            data.results.map((question: any, index: number) => ({
              index: index,
              category: question.category,
              question: question.question,
              correct_answer: question.correct_answer === "True",
            }))
          )
        );
      } else {
        throw new Error("The response was not successful");
      }
    } catch (error) {
      console.log({ error });
      dispatch(getQuestionsFailure());
    }
  };
}
