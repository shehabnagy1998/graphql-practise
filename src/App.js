import React, { Component } from 'react';
import Books from './components/Books';
import AddBook from './components/AddBook';

class App extends Component {
  render() {
    return (
      <article className="App">
        <Books />
        <AddBook />
      </article>
    );
  }
}

export default App;
