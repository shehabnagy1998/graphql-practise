import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookDetailQuery } from '../queries/queries';

class BookDetail extends Component {

    displayBookDetail = _ => {
        let { book } = this.props.data;
        return book ? (
            <section>
                <h1>{book.name}</h1>
                <p>{book.genre}</p>
                <ul>
                    {
                        book.author.books.map(b => <li key={b.id}>{b.name}</li>)
                    }
                </ul>
            </section>
        ) : <section>no book choosed</section>
    }

    render() {
        return (
            <article>
                {this.displayBookDetail()}
            </article>
        )
    }
}

export default graphql(getBookDetailQuery,
    {
        options: props => {
            return {
                variables: {
                    id: props.selected
                }
            }
        }
    }
)(BookDetail)