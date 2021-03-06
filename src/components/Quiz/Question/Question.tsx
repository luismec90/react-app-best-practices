import { useAppDispatch } from "hooks/hooks";
import { setUserAnswer } from "store/slices/quizSlice";

interface QuestionProps {
  index: number;
  category: string;
  question: string;
  setCurrentQuestionIndex: (index: number) => void;
}

function Question({ index, category, question, setCurrentQuestionIndex }: QuestionProps) {
  const dispatch = useAppDispatch();

  const setAnswer = (answer: boolean) => {
    dispatch(
      setUserAnswer({
        index,
        user_answer: answer,
      })
    );

    setCurrentQuestionIndex(index + 1);
  };

  return (
    <div>
      <div className="max-w-md rounded overflow-hidden shadow-lg bg-white py-4 text-center min-h-[200px]">
        <div className="px-6 py-5">
          <div className="font-bold text-xl mb-5">{category}</div>
          <p className="text-gray-700 text-base flex items-center" style={{ minHeight: "100px" }}>
            {question}
          </p>
        </div>
        <div className="flex justify-center space-x-4 pt-4 pb-2">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setAnswer(true)}>
            True
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setAnswer(false)}>
            False
          </button>
        </div>
      </div>
      <div className="text-center mt-3">{index + 1} / 10</div>
    </div>
  );
}

export default Question;
