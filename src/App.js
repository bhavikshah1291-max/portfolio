import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PachkanCalculator from "./PachkanCalculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pachkan" element={<PachkanCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;