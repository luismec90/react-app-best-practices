import Question from "components/Quiz/Question";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, selectQuiz } from "store/slices/quizSlice";
import { decodeHtmlEntities } from "utils/stringsHelper";

function Quiz() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { questions, loading, hasErrors } = useAppSelector(selectQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (currentQuestionIndex === 10) {
      navigate("/results", { replace: true });
    }
  }, [currentQuestionIndex, navigate]);

  if (hasErrors) {
    return <div>Something went wrong, please check your connection, if the problem persist, contact support contact@support.com</div>;
  }

  if (loading || questions.length === 0 || currentQuestionIndex === 10) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Question
        index={currentQuestionIndex}
        category={questions[currentQuestionIndex].category}
        question={decodeHtmlEntities(questions[currentQuestionIndex].question)}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}

export default Quiz;
