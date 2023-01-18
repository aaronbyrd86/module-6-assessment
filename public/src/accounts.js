function findAccountById(accounts, id) {
  return accounts.find(({id: currentId}) => currentId === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort(({name: {last: lastName1}}, {name: {last: lastName2}}) => lastName1 > lastName2 ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;

  for(const book of books)
  {
    for(const element of book.borrows)
    {
      if(element.id === account.id)
        total++;
    }
  }

  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  //go through each item in books[i].borrwed and check account.id matches books[i].borrowed.id
  //if true check returned. if returned add object to array
  let result = [];

  for(const book of books)
  {
    const author = authors.find((currentAuthor) => currentAuthor.id === book.authorId);

    for(const element of book.borrows)
    {
      if(element.id === account.id)
      {
        if(!element.returned) {
          let bookToPush = book;
          bookToPush["author"] = author;
          result.push(bookToPush);
        }
      }
    }
  }
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
