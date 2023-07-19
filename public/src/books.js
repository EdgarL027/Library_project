function findAuthorById(authors, id) {
  let found = authors.find((number) => number.id === id);
  return found;
}

function findBookById(books, id) {
  let found = books.find((number) => number.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  //Initialize two arrays to split our book array.
  const checkedOutBooks = [];
  const returnedBooks = [];

  /* 
  We loop through the book array to get to the borrows array
  And set the first index in the borrows array to the variable lastBorrow
  */

  for (const book of books) {
    const { borrows } = book;
    const [lastBorrow] = borrows;

    /*
    With access to the borrows array we check the returned status of the book
    If the returned value is true we push it into returnedBooks
    otherwise, we push it into checkedOutBooks
    */
    if (lastBorrow.returned) {
      returnedBooks.push(book);
    } else {
      checkedOutBooks.push(book);
    }
  }

  //finally, we return the two book arrays combined into a single array
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  //Initialize a new array to hold our accounts
  const borrowers = [];

  /*
  We loop through our book object to access the borrows array.
  Then we grab the account that matches the account in the borrows array
  */
  for (const borrow of book.borrows) {
    const account = accounts.find((name) => name.id === borrow.id);
    // We construct our account object with the added returned key and value
    const borrower = {
      ...account,
      returned: borrow.returned,
    };
    //then we push this new object into our empty array
    borrowers.push(borrower);
/*
Finally, we check if the array length is equal to 10.
If it is, we break out of the loop with our break statement.
*/
    if (borrowers.length === 10) {
      break;
    }
  }

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
