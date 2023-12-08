import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import LandingPage from "./views/LandingPage";


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App;
