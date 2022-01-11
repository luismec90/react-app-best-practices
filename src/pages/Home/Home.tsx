import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the trivia challenge</h1>
      <h4>You will be presented with 10 true or false questions.</h4>
      <p>Can you score 100%?</p>
      <Link to="/quiz">Begin</Link>
    </div>
  );
}

export default Home;
