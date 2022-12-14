//dom selectors
const formToggle = document.getElementById("formButton");
const bookForm = document.getElementById('bookForm');
const input = document.getElementById("inputForm");
const closeForm = document.getElementById("closeForm");
const main = document.getElementById("main");
const display = document.getElementById("display");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pageCount = document.getElementById("page");
const coverImage = document.getElementById("image");
const read = document.getElementById("read");
const submit = document.getElementById("submit");

let library = []; //this will store our books

/**
 * This is the constructor / prototype for new books in our library.
 * @param title the title of our book.
 * @param author the author of our book.
 * @param pageCount the number of pages in our book.
 * @param read if our book has been read or not.
 * @param image the cover image of our book. 
*/
function Book(title, author, pageCount, read, image) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.coverImage = image;
}

//open and close the input
formToggle.addEventListener("click", function() {
    main.style.filter = "blur(2px)";
    bookForm.style.display = "block";
});
closeForm.addEventListener("click", function() {
    bookForm.style.display = "none";
    main.style.filter = "none";
    clearInput();
});

//if we successfully submit the data make a new book
//and push it to the array
submit.addEventListener("click", function() { 
    //show when our required fields are not entered
    if (title.value == '') {
        title.style.border = '1px solid red';
        return;
    } else {
        title.style.border = '';
    }
    if (author.value == '') {
        author.style.border = '1px solid red';
        return;
    } else {
        author.style.border = '';
    }
    //test if the pagecount value is too long
    if(pageCount.value > 100000) {
        alert('too many pages!');
        return;
    }
    //make the new book and add it to our library
    let book = new Book(title.value, author.value, pageCount.value, read.checked, coverImage.value);
    library.push(book);
    bookForm.style.display = "none";
    main.style.filter = "none";
    //remove previous saved data from input fields
    clearInput();
    //update the UI
    updateUI(library);
});

/**
 * This function loops through our 'library'
 * for each book it adds it to the UI
 * @param lib the library to loop through
*/
function updateUI(lib) {
    display.innerHTML = '';
    for(let i = 0; i < lib.length; i++) {
        if (lib[i] == undefined) {
            continue;
        }
        let div = display.appendChild(document.createElement('div'));
        div.className = 'book';
        //make cover image
        let cover = div.appendChild(document.createElement('img'));
        cover.src = lib[i]['coverImage'];
        cover.alt = 'cover image';
        //make author name
        let author = div.appendChild(document.createElement('div'));
        author.className = 'author';
        author.textContent = `Author: ${lib[i]['author']}`;
        //make book title
        let title = div.appendChild(document.createElement('div'));
        title.className = 'bookTitle';
        title.textContent = `${lib[i]['title']}`;
        //make page count
        let count = div.appendChild(document.createElement('div'));
        count.className = 'pageCount';
        count.textContent = `Page Count: ${lib[i]['pageCount']}`;
        //determine if the book has been read
        let read = div.appendChild(document.createElement('div'));
        read.className = 'readStatus';
        if(lib[i]['read'] ==  true) {
            read.textContent = 'Read';
            read.id = 'read';
        }
        else {
            read.textContent = 'Not read yet';
            read.id = 'notRead';
        }
        //make toggle button
        let toggle = read.appendChild(document.createElement('button'));
        toggle.className = 'toggleStatus';
        toggle.textContent = 'Change Status';
        //make delete button - extra div needed for 
        let delBase = div.appendChild(document.createElement('div'));
        delBase.className= 'delBase';
        let del = delBase.appendChild(document.createElement('button'));
        del.className = 'delBtn';
        del.textContent = 'Delete this book';       
    };
    //make the delete buttons functional
    let delButtons = document.getElementsByClassName("delBtn");
    for (let a = 0; a < delButtons.length; a++) {
        delButtons[a].addEventListener("click", function() {
            lib.splice(a, 1);
            this.parentNode.remove();
            updateUI(lib);//we need to use recursion to update the index the buttons are linked to
        })
    }
    toggleButtons();
}

/**
 * This clears input data from our inputs
*/
function clearInput() {
    title.value = author.value = coverImage.value = '';
    read.checked = false;
    pageCount.value = null;
}

/**
 * This function makes our toggle status buttons work
*/
function toggleButtons() {
    let statButtons = document.getElementsByClassName("toggleStatus");
    for (let s = 0; s < statButtons.length; s++) {
        statButtons[s].addEventListener("click", function() {
            if(this.parentNode.id == 'read') {
                const parent = this.closest('#read');
                parent.innerHTML = 'Not read yet<button class="toggleStatus">Change Status</button>';
                parent.id = "notRead";
                toggleButtons();//we need to use recursion to update the index the buttons are linked to
            } 
            else {
                const parent = this.closest('#notRead');
                parent.innerHTML = 'Read<button class="toggleStatus">Change Status</button>';
                parent.id = "read";
                toggleButtons();//we need to use recursion to update the index the buttons are linked to
            }
        })
    }
}
