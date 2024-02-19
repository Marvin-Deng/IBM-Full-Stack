const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!await isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user. Username or password may be missing" });
});

// Get the book list available in the shop
public_users.get("/", (req, res) => {
  res.json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: "No book found for ISBN: " + isbn });
  }
});

// Get book details based on author
public_users.get("/author/:author", (req, res) => {
  const { author } = req.params;
  const booksByAuthor = Object.values(books).filter(
    (book) => book.author === author
  );
  if (booksByAuthor) {
    return res.json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "No books written by author: " + author });
  }
});

// Get all books based on title
public_users.get("/title/:title", (req, res) => {
  const { title } = req.params;
  const booksWithTitle = Object.values(books).filter(
    (book) => book.title.toLowerCase() === title.toLowerCase().trim()
  );
  if (booksWithTitle.length > 0) {
    return res.json(booksWithTitle);
  } else {
    return res.status(404).json({ message: "No books with this title: " + title });
  }
});

//  Get book review
public_users.get("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const review = books[isbn]["reviews"];
  if (review) {
    return res.json(review);
  } else {
    return res.status(404).json({ message: "No review found for book found for ISBN: " + isbn });
  }
});

module.exports.general = public_users;
