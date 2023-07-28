function findAuthorById(authors, id) {
  let found = authors.find((number) => number.id === id);
  return found;
}

function findBookById(books, id) {
  let found = books.find((number) => number.id === id);
  return found;
}

/*
Helper function to help with partitionBookByBorrowedStatus function
This checks the return status based on the 'returned' property
of the first transaction in the 'borrows' array
*/

function isBookReturned(book) {
  return book.borrows[0].returned;
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter((book) => !isBookReturned(book));
  const returnedBooks = books.filter((book) => isBookReturned(book));
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
