function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let checkedOutCount = 0;

  // Iterate through each book object
  for (const book of books) {
    // Iterate through each borrows object
    for (const borrow of book.borrows) {
      // Check if the book is not returned
      if (!borrow.returned) {
        checkedOutCount++;
      }
    }
  }
  return checkedOutCount;
}

function getMostCommonGenres(books) {
  //Initialize a new object to hold our genre count
  let genreCount = {};

  //Using an if statement, we count the occurences of each genre
  for (const book of books) {
    const { genre } = book;
    if (genreCount[genre]) {
      genreCount[genre]++;
    } else {
      genreCount[genre] = 1;
    }
  }

  //Using our genreCounts object we create a new array
  const genres = Object.keys(genreCount).map((genre) => ({
    name: genre,
    count: genreCount[genre],
  }));

  // Sort the genre array by count in descending order
  genres.sort((a, b) => b.count - a.count);

  // Return the top five genres or fewer
  return genres.slice(0, 5);
}
//side note: I can no longer see the word genre normally... it just looks wrong.

function getMostPopularBooks(books) {
  //Initialize an object to hold our counts of each book
  let bookCounts = {};

  /*
  Count the number of times each book has been borrowed
  We assign the borrows length to the book title in our bookCounts object
  */
  for (const book of books) {
    const { borrows } = book;
    bookCounts[book.title] = borrows.length;
  }

  /*
  Create a tailoerd array of book objects
  */
  const popularBooks = Object.keys(bookCounts).map((title) => ({
    name: title,
    count: bookCounts[title],
  }));

  // Sort the book objects by count in descending order
  popularBooks.sort((a, b) => b.count - a.count);

  // Return the top five popular books or fewer
  return popularBooks.slice(0, 5);
}

//Helper function to help with getMostPopularAuthors function below
function getBooksBorrowCount(books, authorId) {
  return books.reduce((count, book) => {
    return count + (book.authorId === authorId ? book.borrowed : 0);
  }, 0);
}

function getMostPopularAuthors(books, authors) {
  // Initialize an empty object to hold out borrow counts for each author
  let authorBorrowCounts = {};

  /*
  Calculate the number of times each author's books have been borrowed
  Extract the authorId and the length of the borrows array
  */
  for (const book of books) {
    const authorId = book.authorId;
    const borrowCount = book.borrows.length;

    /*
    We add the borrows length to the corresponding author
    If it already exists, we add the length
    otherwise, we add it to our object and set it to that first instance of length
    */
    if (authorBorrowCounts[authorId]) {
      authorBorrowCounts[authorId] += borrowCount;
    } else {
      authorBorrowCounts[authorId] = borrowCount;
    }
  }

  /*
  Create an array of author objects
  We iterate through the authors array.
  For each author we grab their Id and their borrow count from the authorBorrowCounts
  */
  const popularAuthors = [];
  for (const author of authors) {
    const authorId = author.id;
    const borrowCount = authorBorrowCounts[authorId];

    /*
    If the borrow count exists,
    meaning they have books that have been borrowed,
    we push a new object into the array with the name key set to the authors first and last name
    and the count set to the borrowCount 
    */
    if (borrowCount) {
      popularAuthors.push({
        name: `${author.name.first} ${author.name.last}`,
        count: borrowCount,
      });
    }
  }

  // Sort the author objects by count in descending order
  popularAuthors.sort((a, b) => b.count - a.count);

  // Return the top five popular authors or fewer
  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
