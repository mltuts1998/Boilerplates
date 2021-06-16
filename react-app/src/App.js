import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Test from './views/test/Test.js'
import NotFound from './views/NotFound.js'

function App() {
  return (
        <Router>
          <Switch>


            <Route path="/test" exact>
              <Test />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
  );
}

export default App;