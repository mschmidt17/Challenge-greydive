import Home from "./components/Home.js"
import Answers from "./components/Answers.js"
import { Route, Routes } from "react-router-dom";
import './App.css';



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
