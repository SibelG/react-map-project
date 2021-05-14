import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"


import Map from "./components/Map"
import query1 from "./components/query1"
import query2 from "./components/query2"
import RouteDrawing from "./components/RouteDrawing"

function App() {
  return (<Router>
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">React Axios Tutorial</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/query1"}>Query1</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/query2"}>Query2</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Map"}>Query3</Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/RouteDrawing"}>Route</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path='/' component={query1} />
              <Route path="/query1" component={query1} />
              <Route path="/query2" component={query2} />
              <Route path="/Map" component={Map} />
              <Route path="/RouteDrawing" component={RouteDrawing} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
  )
}

export default App