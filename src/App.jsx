import { NavBar } from "./Components";
import { Routes, Route } from "react-router-dom";
import { Home, Tablee, Forms, Products } from "./pages";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:productId" element={<Products />} />
        <Route path="table" element={<Tablee />} />
        <Route path="form" element={<Forms />} />
      </Routes>
    </div>
  );
}

export default App;
