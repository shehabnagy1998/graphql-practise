import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorQuery, addBookQuery, getBookQuery } from '../queries/queries';

class AddBook extends Component {

    state = {
        name: '',
        genre: '',
        authorid: ''
    };

    handleSubmit = e => {
        e.preventDefault()
        this.props.addBookQuery({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorid: this.state.authorid
            },
            refetchQueries: [
                { query: getBookQuery }
            ]
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    displayAuthors = _ => {
        let { getAuthorQuery } = this.props;
        return getAuthorQuery.loading ? <option>Loading authors...</option> :
            getAuthorQuery.authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)
    }

    render() {
        return (
            <article>
                <h1>Add New Book</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Book name:</label>
                        <input type="text" id="name" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="genre">Book genre:</label>
                        <input type="text" id="genre" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="authorid">Book author:</label>
                        <select id="authorid" onChange={this.handleChange} >
                            <option >Select author</option>\
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <div>
                        <button type="submit">+</button>
                    </div>
                </form>
            </article>
        )
    }
}

export default compose(
    graphql(getAuthorQuery, { name: 'getAuthorQuery' }),
    graphql(addBookQuery, { name: 'addBookQuery' })
)(AddBook)
