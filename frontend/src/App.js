import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/PropertyDetails" component={PropertyDetails} />
        <Route path="/Register" component={Register} />
        <Route path="/SellerDashboard" component={SellerDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
