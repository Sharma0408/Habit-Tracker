import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../client/src/pages/Login";
import Register from "../../client/src/pages/Register";
import Dashboard from "../../client/src/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;