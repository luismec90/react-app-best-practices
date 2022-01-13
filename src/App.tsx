import Layout from "components/Layout";
import Home from "pages/Home";
import Quiz from "pages/Quiz";
import Results from "pages/Results";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "store/store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </Provider>
  );
}

export default App;
