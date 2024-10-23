import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ShopRegistration from './components/ShopRegistration';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={ShopRegistration} />
      </Switch>
    </Router>
  );
};

export default App;
