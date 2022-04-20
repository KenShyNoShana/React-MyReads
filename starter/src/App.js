import "./App.css";
import { useState, useEffect } from "react";
import { getAll } from './BooksAPI';
import { Route, Routes } from "react-router-dom";
import Search from "./components/search";
import CreateBooks from "./components/createBooks";
import CreateShelf from "./components/createShelf";
import CreateMain from "./components/createMain";

function App() {
  const [getShelfBooks, setShelfBooks] = useState([]);

  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    async function getBooks()
    {
      // this resetting of the state is needed, because otherwise books that already rendered would re-render
      // there may be a better way of doing this but I couldnt think of any :/
        setCurrentlyReadingBooks([]);
        setWantToReadBooks([]);
        setReadBooks([]);

        const shelfBooks = await getAll();

        shelfBooks.forEach((book) => {
        if(book.shelf === "currentlyReading")
        {
          return setCurrentlyReadingBooks(currentlyReadingBooks => [...currentlyReadingBooks, book]);
        }

        else if(book.shelf === "wantToRead")
        {
          return setWantToReadBooks(wantToReadBooks => [...wantToReadBooks, book]);
        }

        else if(book.shelf === "read")
        {
          return setReadBooks(readBooks => [...readBooks, book]);
        }

        })
    }

    getBooks();
  }, [getShelfBooks])

  return (
    <Routes>
        <Route path="/search" element={<Search setShelfBooks={setShelfBooks}/>}/>

        <Route exact path="/" element={
          <CreateMain shelfs={
            [ <CreateShelf books={<CreateBooks bookArray={currentlyReadingBooks} setShelfBooks={setShelfBooks}/>} bookShelf="Currently Reading"/>,
              <CreateShelf books={<CreateBooks bookArray={wantToReadBooks} setShelfBooks={setShelfBooks}/>} bookShelf="Want to Read"/>,
              <CreateShelf books={<CreateBooks bookArray={readBooks} setShelfBooks={setShelfBooks}/>} bookShelf="Read"/>
            ]}/>
        }/>
    </Routes>
  );
}

export default App;