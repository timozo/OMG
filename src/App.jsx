import "./App.css";
import LandingPage from "./views/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import Search from "./views/Search";
import Header from "./components/Header";
import AddRatingModal from "./views/AddRatingModal";
import AllCourses from "./views/AllCourses";
import Course from "./views/Course";
import EasyCredits from "./views/EasyCredits";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:id" element={<Course />}/>
          <Route path="/courses/:id/add-rating" element={<AddRatingModal />}/>
          <Route path="/ezpz" element={<EasyCredits />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
