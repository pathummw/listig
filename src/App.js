import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import NewListPopup from "./NewListPopup";
import ShoppingList from "./ShoppingList";
import ClimateImpact from "./ClimateImpact";
import Alternative from "./Alternative";
import { AuthProvider } from "./Auth";



function App() {


  return (
    <>
      <AuthProvider>
        <Router>
          <div>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/create-new-list" component={NewListPopup} />
              <Route path="/shopping-list" component={ShoppingList} />
              <Route path="/climate-impact" component={ClimateImpact} />
              <Route path="/alternative" component={Alternative} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </>
  );


}

export default App;

