import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import User from './pages/User';
import Booking from './pages/Booking';
import Event from './pages/Event';
import './App.scss';

class App extends Component {
  render() {
    return (
      <article className="App">
        <Switch>
          <Redirect from="/" to="/user" exact />
          <Route path="/user" component={User} />
          <Route path="/booking" component={Booking} />
          <Route path="/event" component={Event} />
        </Switch>
      </article>
    );
  }
}

export default App;
