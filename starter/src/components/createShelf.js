import PropTypes from "prop-types";

function CreateShelf({books, bookShelf})
{
    return(
        <div id={bookShelf} key={bookShelf}>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookShelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                       {books}
                    </ol>
                </div>
            </div>
        </div>
    )
}

CreateShelf.propTypes = {
    books: PropTypes.object,
    bookShelf: PropTypes.string
}
export default CreateShelf;