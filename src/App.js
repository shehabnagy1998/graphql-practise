import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import User from './pages/User';
import Booking from './pages/Booking';
import Event from './pages/Event';
import './App.scss';
import Navbar from './components/Navbar/Navbar';

class App extends Component {
  render() {
    return (
      <article className="App">
        <Navbar />
        <main className="container">
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={User} />
            <Route path="/booking" component={Booking} />
            <Route path="/event" component={Event} />
          </Switch>
        </main>
      </article>
    );
  }
}

export default App;
