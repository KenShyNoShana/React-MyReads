import { update, getAll } from '../BooksAPI';
import PropTypes from "prop-types";

function CreateBooks({bookArray, setShelfBooks})
{
    // filters out any books with missing image/title/author(s)
    const validBooks = bookArray.filter(book => book.imageLinks && book.title && book.authors !== undefined)

    return( validBooks.map(book => {
        return(
                <li key={book.id}>
                <div className="bookshelf-books" >
                        <ol className="books-grid">
                            <li>
                            <div className="book">
                                <div className="book-top">
                                <div
                                    className="book-cover"
                                    style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                        `url(${book.imageLinks.thumbnail})`,
                                    }}
                                ></div>
                                <div className="book-shelf-changer">
                                    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(event) =>
                                    {
                                        update(book, event.target.value);
                                        alert(`Successfully changed ${book.title} to ${event.target.value}`);
                                        setShelfBooks(getAll());
                                    }}>
                                    <option disabled>
                                        Move to...
                                    </option>
                                    <option value="currentlyReading">
                                        Currently Reading
                                    </option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title" id={book.id}>{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                            </li>
                        </ol>
                </div>
            </li>
            )
        })
    )
}

CreateBooks.propTypes = {
    bookArray: PropTypes.array,
    setShelfBooks: PropTypes.func
}

export default CreateBooks;

