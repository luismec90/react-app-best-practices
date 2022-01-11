type QuestionProps = {
  question: string;
};

function Question({ question }: QuestionProps) {
  return (
    <div>
      <h3>{question}</h3>
      <button type="button">True</button>
      <button type="button">False</button>
    </div>
  );
}

export default Question;
