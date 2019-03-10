import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries';
import BookDetail from './BookDetail';

class Books extends Component {

    state = {
        selected: ''
    };

    displayBooks = _ => {
        let { getBookQuery } = this.props;
        return getBookQuery.loading ? <li>loading books...</li> :
            getBookQuery.books.map((book) =>
                <li key={book.id}
                    onClick={e => { this.setState({ selected: book.id }) }}
                >{book.name} - {book.genre}</li>)
    }

    render() {
        return (
            <article>
                <h1>Books list</h1>
                <ul>
                    {this.displayBooks()}
                </ul>
                <BookDetail selected={this.state.selected} />
            </article>
        )
    }
}

export default graphql(getBookQuery, { name: 'getBookQuery' })(Books)