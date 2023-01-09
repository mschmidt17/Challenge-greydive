import Home from "./components/Home.js"
import { Route, Routes } from "react-router-dom";
import './App.css';
import Answers from "./components/Answers.js";



function App() {
  
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/answers" element={<Answers/>}/>
      </Routes>
    </div>
  );
}

export default App;
