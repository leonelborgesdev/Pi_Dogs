import "./App.css";
import { Routes, Route } from "react-router-dom";
import Breeds from "./components/Breeds/Breeds";
import CreateBreeds from "./components/CreateBreeds/CreateBreeds";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/breeds"} element={<Breeds />} />
        <Route path={"/createBreeds"} element={<CreateBreeds />} />
      </Routes>
    </div>
  );
}

export default App;
