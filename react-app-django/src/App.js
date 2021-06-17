import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Views
import Test from './views/test/Test.js'
import NotFound from './views/NotFound.js'
import Login from './views/users/Login.js'
import Register from './views/users/Register.js'
import UpdateProfile from './views/users/UpdateProfile.js'
import Home from './views/Home.js'
import Loader from './components/utilities/Loader.js';
import { useHistory } from 'react-router-dom';

//Context
import GlobalContextProvider, { GlobalContext } from './contexts/GlobalContext.js';

function App() {
  const [loader, setLoader] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
      console.log(loader);
    }, 3000);
  }, [])
  return (
    loader ?
    (
      <Loader />
    )
    :
    (  
      <GlobalContextProvider>
          <Router>
            <Switch>
          
            <Route path="/" exact>
                <Home />
              </Route>

              <Route path="/test" exact>
                <Test />
              </Route>


              {/* User Auth */}
              <Route path="/login" exact>
                <Login />
              </Route>

              <Route path="/register" exact>
                <Register />
              </Route>

              <Route path="/update-profile" exact>
                <UpdateProfile />
              </Route>

              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Router>
      </GlobalContextProvider>
    )        
  );
}

export default App;