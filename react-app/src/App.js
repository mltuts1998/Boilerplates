import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Test from './views/test/Test.js'
import NotFound from './views/NotFound.js'
import GlobalContextProvider from './contexts/GlobalContext.js';

function App() {
  return (
      <GlobalContextProvider>
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
      </GlobalContextProvider>
  );
}

export default App;