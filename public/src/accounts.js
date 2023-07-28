function findAccountById(accounts, id) {
  return accounts.reduce((foundAccount, account) => {
    if (account.id === id) {
      foundAccount = account;
    }
    return foundAccount;
  }, null);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;

  // Iterate through each book object
  for (const book of books) {
    // Iterate through each borrows object
    for (const borrow of book.borrows) {
      // Check if the book is not returned
      if (borrow.id === account.id) {
        count++;
      }
    }
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  //Initialize empty array to hold our modified book object
  let checkedOutBooks = [];

  //Loops through book array, grabbing the borrows array and authorId, as well as setting the current borrowed status to the first array index in borrows
  for (const book of books) {
    const { borrows, authorId } = book;
    const currentBorrow = borrows[0];

    //check if the current borrower is the account passed in and check if the book has been returned or not
    if (currentBorrow.id === account.id && !currentBorrow.returned) {
      //grab the author from the authors array to push into our modified book object
      const author = authors.find((author) => author.id === authorId);
      const bookWithAuthor = {
        ...book,
        author,
      };
      checkedOutBooks.push(bookWithAuthor);
    }
  }

  return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
