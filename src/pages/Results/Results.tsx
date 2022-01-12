import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const questions = useAppSelector((state) => state.quiz.questions);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (questions.length < 10) {
      navigate("/quiz", { replace: true });
    }

    const score = questions.reduce(
      (previousValue, currentValue) => previousValue + (currentValue.correct_answer === currentValue.user_answer ? 1 : 0),
      0
    );

    setScore(score);
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">You scored {score}/10</h1>
      <ol className="list-decimal">
        {questions.map((question) => {
          const isCorrect = question.correct_answer === question.user_answer;
          return (
            <li key={question.index} className={`mb-2 ${isCorrect ? "text-green-600" : "text-rose-600	"}`}>
              <div>
                {question.question} ({question.correct_answer ? "True" : "False"}){" "}
                {isCorrect ? <CheckIcon className="w-5 inline" /> : <XIcon className="w-5 inline" />}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="flex justify-center mt-8">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => navigate("/quiz")}>
          Play again?
        </button>
      </div>
    </div>
  );
}

export default Results;
