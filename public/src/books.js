function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let partitioned = [];
  let borrowedBooks = [];
  let notBorrowedBooks = [];

  for (const book of books){
    let borrowed = book.borrows.every((currentBook) => currentBook.returned);

    borrowed ? notBorrowedBooks.push(book) : borrowedBooks.push(book);
  }

  partitioned.push(borrowedBooks);
  partitioned.push(notBorrowedBooks);

  return partitioned;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  for (const borrower of book.borrows) {
    
    let filtered = accounts.filter((account) => {
      if (account.id === borrower.id)
      {
        borrower.returned ? account["returned"] = true : account["returned"] = false;
        return true;
      }
      else
        return false
    })
    result = result.concat(filtered);
  }

  if (result.length > 10) result.length = 10;

  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
