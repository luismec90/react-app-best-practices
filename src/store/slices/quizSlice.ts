import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export interface Question {
  index: number;
  question: string;
  correct_answer: boolean;
  user_answer: boolean;
}

export interface QuizState {
  questions: Question[];
}

const initialState: QuizState = {
  questions: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<Question>) => {
      const exist = state.questions.find((q) => q.index === action.payload.index);
      if (exist) {
        state.questions = state.questions.map((q) => (q.index === action.payload.index ? action.payload : q));
      } else {
        state.questions = [...state.questions, action.payload];
      }
    },
  },
});

// Export actions
export const { setQuestion } = quizSlice.actions;

// Export selectors
export const selectCount = (state: RootState) => state.quiz;

export default quizSlice.reducer;
