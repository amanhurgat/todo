import "./App.css";
import Login from "./Pages/Login/Login.tsx";
import Register from "./Pages/Signup/Signup.tsx";
import Home from "./Pages/Home/Home.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
