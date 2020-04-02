import React from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getBookQuery, deleteBookMutation, getBooksQuery } from '../queries/queries';

class BookDetails extends React.Component {

    deleteBook = () => {
        this.props.deleteBookMutation({
            variables: {
                id: this.props.bookId
            },
            refetchQueries: [{ query: getBooksQuery, getBookQuery }]
        });

    }
    displayBookDetails() {
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                    <button id="delete" onClick={this.deleteBook}>Delete Book</button>
                </div>
            )
        } else {
            return (<div>No book selected</div>)
        }
    }
    render() {
        return (
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        );
    }

}

export default compose(
    graphql(getBookQuery, {
        options: props => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    }),
    graphql(deleteBookMutation, { name: "deleteBookMutation" }, {
        options: props => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    })
)(BookDetails);