// - - - - - - - - - - Import Libraries
// *** Http
import {createServer} from "http";

// - - - - - - - - - - Dummy Data
// *** Books
const books = [
  {id: 1, name: "book 1"},
  {id: 2, name: "book 2"},
];

// - - - - - - - - - - App
// *** Init App
const app = createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello NodeJS");
    res.end();
  }
  if (req.url === "/api/books") {
    res.write(JSON.stringify(books));
    res.end();
  }
});

// *** Server
const Port = 5001;
app.listen(Port, () => console.log(`Server Is Running On Port ${Port}`));
