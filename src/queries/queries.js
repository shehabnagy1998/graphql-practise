import { gql } from 'apollo-boost'

export const getBookQuery = gql`
    query{
        books {
            name,
            genre,
            id,
            author {
                name,
                age,
                id
            }
        }
    }
`

export const getAuthorQuery = gql`
    query{
        authors {
            name,
            age,
            id
        }
    }
`

export const addBookQuery = gql`
    mutation ($name: String!, $genre: String!, $authorid: ID!) {
        addBook(name: $name, genre: $genre, authorid: $authorid) {
            name, 
            genre,
            id
        }
    }
`

export const getBookDetailQuery = gql`
    query($id: ID!) {
        book(id: $id) {
            id,
            name,
            genre,
            author {
                id,
                name, 
                age,
                books {
                    id,
                    name,
                    genre
                }
            }
        }
    }
`