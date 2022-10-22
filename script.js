//dom selectors
const formToggle = document.getElementById('formButton');
const bookForm = document.getElementById('bookForm');

let library = []; //this will store our books

//constructor/prototype for the new books in our library
function Book(title, author, pageCount, read, image) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.coverImage = image;
}

//this function will add books to our already existing library
function appendLibrary(book) {
    library.push(book);
}


const theHobbit = new Book('The Hobbit', 'Tolkein', 500, true, 'https://bookstr.com/wp-content/uploads/2019/12/Image-via-Amazon-1.jpg');