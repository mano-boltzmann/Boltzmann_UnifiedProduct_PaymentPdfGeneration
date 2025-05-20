import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Simple from "./simple"; // make sure the file and export exist

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/simple" element={<Simple />} />
    </Routes>
  );
}

export default App;
