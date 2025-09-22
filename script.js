let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let popular = document.getElementById("popular");
let bookList = [];

function createAndAppend(bookObj){
    let bookContainer = document.createElement('div');
    let bookImage = document.createElement('img');
    let bookTitle = document.createElement('p');

    bookImage.src = bookObj.imageLink;
    bookTitle.textContent = bookObj.author;
    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);
    searchResults.appendChild(bookContainer);
}

function displaySearchResults() {
    searchResults.textContent = "";
    let searchInputVal = searchInput.value;

    for (let book of bookList) {
        let bookName = book.title;
        if (bookName.includes(searchInputVal)) {
            createAndAppend(bookObj);
        }
    }
}

function fetchResponse(event){
    if(event.key === "Enter"){
        spinner.classList.remove("d-none");
        fetch("https://apis.ccbp.in/book-store")
        .then(res => {
            return res.json();
        })
        .then(data => {
            bookList = data.searchResults;
            console.log(bookList);
            for(let bookObj of data.search_results){
                createAndAppend(bookObj);
            }
            spinner.classList.add("d-none");
            popular.classList.remove("d-none");
        });
    }
}

searchInput.addEventListener("keydown", fetchResponse);