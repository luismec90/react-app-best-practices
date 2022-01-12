import Question from "components/Quiz/Question";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeHtmlEntities } from "utils/stringsHelper";

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.response_code === 0) {
          setQuestions([...data.results]);
        } else {
          console.error("error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === 10) {
      navigate("/results", { replace: true });
    }
  }, [currentQuestionIndex, navigate]);

  if (questions.length === 0 || questions[currentQuestionIndex] === undefined) return <div>Loading...</div>;

  return (
    <div>
      <Question
        index={currentQuestionIndex}
        category={questions[currentQuestionIndex].category}
        question={decodeHtmlEntities(questions[currentQuestionIndex].question)}
        correctAnswer={questions[currentQuestionIndex].correct_answer}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}

export default Quiz;
