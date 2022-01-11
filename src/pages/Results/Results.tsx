import { useAppSelector } from "common/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const questions = useAppSelector((state) => state.quiz.questions);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (questions.length < 9) {
      navigate("/", { replace: true });
    }

    const score = questions.reduce(
      (previousValue, currentValue) => previousValue + (currentValue.correct_answer === currentValue.user_answer ? 1 : 0),
      0
    );

    setScore(score);
  }, []);

  return (
    <div>
      <h1>You scored {score}/10</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.index}>
            <div>{question.question}</div>
            {question.correct_answer === question.user_answer ? "Correct" : "incorrect"}
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => navigate("/quiz")}>
        Play again?
      </button>
    </div>
  );
}

export default Results;
