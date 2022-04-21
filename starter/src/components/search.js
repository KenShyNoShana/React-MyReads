import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { search, getAll } from '../BooksAPI';
import CreateBooks from "./createBooks";

function Search ({setShelfBooks})
{
    const [query, setQuery] = useState("");
    const updateQuery = (query) =>
    {
        setQuery(query.trim());
    }

    const [bookArray, setBookArray] = useState([]);

    useEffect(() => {

        function checkIfEmpty()
        {
          if(query === "")
          {
            setBookArray([]);
          }
        }

        async function getInputData()
        {
          // searches for books that match the searchterm
            if(query !== "")
            {
                let inputData = await search(query.toLocaleLowerCase());
                let shelfBooks = await getAll();
                // checks if book is already in shelf, if so changes selected shelf to corresponding one
                if(inputData.error === undefined)
                {
                  inputData.forEach((book, index) => {
                    for(let i = 0; i < shelfBooks.length; i++)
                    {
                      if(book.id === shelfBooks[i].id)
                      {
                        inputData.splice(index, 1, shelfBooks[i]);
                      }
                    }
                  })
                    setBookArray(inputData);
                }
                else
                {
                  setBookArray([]);
                }
            }
            checkIfEmpty();
        }
        getInputData();
        setTimeout(checkIfEmpty, 1500);

    }, [query])



    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={(event) => {updateQuery(event.target.value)}}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
                <CreateBooks bookArray={bookArray} setShelfBooks={setShelfBooks}/>
            }
            </ol>

            </div>
        </div>
    )
}

export default Search;