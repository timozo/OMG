import "./App.css";
import LandingPage from "./views/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import Search from "./views/Search";
import Header from "./components/Header";
import RatingsPage from "./views/RatingPage";
import AllCourses from "./views/AllCourses";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/rating" element={<RatingsPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/ezpz" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
