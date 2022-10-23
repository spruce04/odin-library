//dom selectors
const formToggle = document.getElementById("formButton");
const bookForm = document.getElementById('bookForm');
const input = document.getElementById("inputForm");
const closeForm = document.getElementById("closeForm");
const main = document.getElementById("main");


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

formToggle.addEventListener("click", function() {
    main.style.filter = "blur(2px)";
    input.style.filter = "none"; //need to fix
    bookForm.style.display = "block";
})
closeForm.addEventListener("click", function() {
    bookForm.style.display = "none";
    main.style.filter = "none";
})