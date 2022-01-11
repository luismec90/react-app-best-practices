import Question from "components/Question";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    if (currentQuestionIndex === 9) {
      navigate("/results", { replace: true });
    }
  }, [currentQuestionIndex]);

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Question
        index={currentQuestionIndex}
        category={questions[currentQuestionIndex].category}
        question={questions[currentQuestionIndex].question}
        correctAnswer={questions[currentQuestionIndex].correct_answer}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}

export default Quiz;
