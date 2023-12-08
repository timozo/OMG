import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./routes/Home"
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <link to="/">Home</link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" Component={Home}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
