const express = require("express");
const router = express.Router();
const Book = require("../model/Books");

// Create a new books
router.post("/book", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;

    const book = new Book({
      title,
      author,
      publishedYear,
    });

    await book.save();
    res.send("Book added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while adding the Book.");
  }
});

// Get all books
router.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the book.");
  }
});

// Get a book by id
router.get("/book/:code", async (req, res) => {
  const bookCode = req.params.code;

  try {
    const book = await Book.findOne({ code: bookCode });

    if (book) {
      res.send(book);
    } else {
      res.status(404).send(`book with code ${bookCode} not found.`);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(`An error occurred while fetching the book with code ${bookCode}.`);
  }
});

router.put("/book/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const { title, author, publishedYear } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        author,
        publishedYear,
      },
      { new: true }
    );

    if (book) {
      res.status(200).json({
        book,
        message: "book updated successfully.",
      });
    } else {
      res.status(404).json({
        message: `book with ID ${bookId} not found.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `An error occurred while updating the book with ID ${bookId}.`,
    });
  }
});

// Delete a book by ID
router.delete("/book/:bookId", (req, res) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "book not found" });
      }

      return Book.findByIdAndDelete(bookId);
    })
    .then(() => {
      console.log(`book with ID ${bookId} deleted successfully`);
      res.json({ message: "book deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete book", err: err });
    });
});

module.exports = router;
