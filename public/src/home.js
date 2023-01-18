function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;

  books.reduce((accumulator, book) => {
    if (book.borrows.some((borrow) => !borrow.returned))
      total++;
    return total;
  }, total)

  return total;
}

function getMostCommonGenres(books) {
  let result = [];
  
  for (const book of books){
    //create a new object for each book in the book array
    let genre = {};
    let updateGenreCount;
  
    genre["name"] = book.genre;
    genre["count"] = 1;

    //check if the new object's genre already exists in the array
    updateGenreCount = doesBookExistInArray(result, book.genre);
    
    //if the genre exists update count of that genre else add the new object to array
    updateGenreCount >= 0 ? result[updateGenreCount].count++ : result.push(genre);
  }

  result.sort(({count: countA}, {count: countB}) => countB - countA)

  if(result.length > 5) result.length = 5;
  
  return result;
}
/*this function checks if a book genre is already in an array
* and if so returns the index where the genre is 
* returns -1 if the genre is not already in the array
*/
function doesBookExistInArray(commonBooks, title)
{
  let index = 0;

  for (const book of commonBooks){
    if(book.name === title){
      return index;
    } 
    index++;
  }
  index = -1;
  return index;
}


function getMostPopularBooks(books) {
  //create an array of names and borrow count
  let result = books.map(book => {
    let popularBook = {};

    popularBook.name = book.title;
    popularBook.count = book.borrows.length;

    return popularBook;
  })
  //sort the array
  result.sort(({count: countA}, {count: countB}) => countB - countA);
  //reduce the length of the array
  if(result.length > 5) result.length = 5;

  return result;
}

function getMostPopularAuthors(books, authors) {
  const mostPopularBooks = getMostPopularBooks(books);

  
  let result = mostPopularBooks.map(popularBook => {
    let popularAuthor = {};
    const author = findAuthorByTitle(books, authors, popularBook.name);

    popularAuthor.name = `${author.name.first} ${author.name.last}`;
    popularAuthor.count = popularBook.count;

    return popularAuthor;
  })

  return result;
}

function findAuthorByTitle(books, authors, title){
  let matchAuthor;
  let matchBook;
  
  for (const book of books)
  {
    if (book.title === title)
    {
      matchBook = book;
      break;
    }
  }

  for(const author of authors){
    if(author.id === matchBook.authorId){
      matchAuthor = author;
      break;
    }
  }

  return matchAuthor;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
