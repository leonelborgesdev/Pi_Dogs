import "./App.css";
import { Routes, Route } from "react-router-dom";
import Breeds from "./components/Breeds/Breeds";
import CreateBreeds from "./components/CreateBreeds/CreateBreeds";
import { BreedDetail } from "./components/BreedDetail/BreedDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/breeds"} element={<Breeds />} />
        <Route path={"/createBreeds"} element={<CreateBreeds />} />
        <Route path={"/breedDetail/:idBreed"} element={<BreedDetail />} />
      </Routes>
    </div>
  );
}

export default App;
