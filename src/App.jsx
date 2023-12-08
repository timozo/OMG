import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from "./routes/Home"
import './App.css'

const App = () => {
  console.log("yo");
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

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
