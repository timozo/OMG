import "./App.css";
import LandingPage from "./views/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import Search from "./views/Search";
import React from "react";

const reload = () => window.location.reload();

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mock_data.json" ={reload}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
