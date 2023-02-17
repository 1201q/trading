import Main from "./Frontend/Main";
import List from "./Frontend/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/exchange" element={<Main />}></Route>
          <Route path="/exchange/:param_coincode" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
