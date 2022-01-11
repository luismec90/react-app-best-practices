import { useEffect, useState } from 'react';
import Question from '../../components/Question';

function Quiz() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.response_code === 0) {
          setQuestions([...data.results]);
        } else {
          console.error('error');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h1>Quiz</h1>
      <Question question={questions[currentQuestion - 1].question} />

      {currentQuestion > 1 && (
        <button
          type="button"
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          Prev
        </button>
      )}

      {currentQuestion < questions.length - 1 && (
        <button
          type="button"
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Quiz;
