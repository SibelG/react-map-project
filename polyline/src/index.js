/*import React from 'react'
import { render } from 'react-dom'
import Map from './components/Map'

render(


  <Map />,
  document.getElementById('map'),

)*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
