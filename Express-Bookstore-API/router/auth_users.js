const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = async (username) => {
  let usersWithSameName = users.filter((user) => {
    return user.username === username;
  });
  if (usersWithSameName.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in: " + accessToken);
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const review = req.body.review;

  let book = books[isbn];
  if (book) {
    if (!book["reviews"] || typeof book["reviews"] !== "object") {
      book["reviews"] = {};
    }

    const reviewId = Date.now().toString();
    book["reviews"][reviewId] = review;

    return res
      .status(200)
      .json({ message: "Review added successfully", book: book });
  } else {
    return res.status(404).json({ message: "No book found for ISBN: " + isbn });
  }
});

// Delete all book reviews
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;

  let book = books[isbn];
  if (book) {
    book["reviews"] = {};

    return res.status(200).json({ message: "Review deleted", book: book });
  } else {
    return res.status(404).json({ message: "No book found for ISBN: " + isbn });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
