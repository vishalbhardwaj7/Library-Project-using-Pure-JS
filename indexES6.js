getOrShowBooks();
//Book class
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}
//Class Display
class Display {
  add(book) {
    let books = localStorage.getItem("books");
    if (books == null) {
      var booksObj = [];
    } else {
      booksObj = JSON.parse(books);
    }
    booksObj.push(book);
    localStorage.setItem("books", JSON.stringify(booksObj));
    getOrShowBooks();
  }
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }
  validate(book) {
    if (book.name.length < 3 || book.author.length < 3) return false;
    return true;
  }
  show(response) {
    let alertHTML = document.createElement("div");
    alertHTML.className = "Alert";
    let body = document.querySelector("body");
    if (response == "Success") {
      alertHTML.innerHTML = `
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>${response}</strong> Book Submitted Successfully !! Hurray !!
                                        <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                        ></button>
                            </div>
    `;
    } else if (response == "Error") {
      alertHTML.innerHTML = `
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>${response}</strong> Book Not Submitted Successfully. Please Enter atleast three letters
                                        <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                        ></button>
                            </div>
    `;
    }
    body.insertBefore(alertHTML, body.children[1]);
    setTimeout(() => {
      alertHTML.innerHTML = "";
    }, 4000);
  }
}
//Show Books func also add to Local Storage------------------------------------
function getOrShowBooks() {
  let books = localStorage.getItem("books");
  if (books == null) {
    var booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }
  let tableBody = document.getElementById("tableBody");
  let uiString = "";
  for (let i = 0; i < booksObj.length; i++) {
    uiString += `<tr>
                    <td>${booksObj[i].name}</td>
                    <td>${booksObj[i].author}</td>
                    <td>${booksObj[i].type}</td>
                    <td><button class="deleteBtn" style="background:orange;color:white">Delete</button></td>
                </tr>`;
  }
  if (booksObj.length != 0) {
    tableBody.innerHTML = uiString;
  } else {
    tableBody.innerHTML = `Nothing to Show Use Add a book `;
  }
  setEvent();
}

// --------------------------------------------------------
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("bookAuthor").value;

  let fiction = document.getElementById("fiction");
  let horror = document.getElementById("horror");
  let scifi = document.getElementById("scifi");

  let type;
  if (fiction.checked) type = fiction.value;
  else if (horror.checked) type = horror.value;
  else type = scifi.value;

  let book = new Book(name, author, type);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("Success");
  } else {
    display.show("Error");
  }
  e.preventDefault();
}

// Adding Search Functionality to Search Books based on a Search

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", search);

//Search Function
function search() {
  let tableBody = document.getElementById("tableBody");
  let inputValue = searchTxt.value;
  if (inputValue != "") {
    for (let i = 0; i < tableBody.children.length; i++) {
      if (
        tableBody.children[i].innerText
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      ) {
        tableBody.children[i].style.background = "green";
        tableBody.children[i].style.color = "white";
      } else {
        tableBody.children[i].style.background = "none";
        tableBody.children[i].style.color = "black";
      }
    }
  } else {
    for (let i = 0; i < tableBody.children.length; i++) {
      tableBody.children[i].style.background = "none";
      tableBody.children[i].style.color = "black";
    }
  }
}

//Preventing Search Btn Default Action

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
});

//Adding event listeners to the delete buttons in all
//Set event listeners on delete buttons----------------
function setEvent() {
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", deleteFun);
  }
}

//Delete Function
function deleteFun(e) {
  let books = localStorage.getItem("books");
  console.log(e);
  if (books == null) {
    var booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }
  for (let i = 0; i < booksObj.length; i++) {
    if (booksObj[i].name == e.path[2].cells[0].innerText) {
      booksObj.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("books", JSON.stringify(booksObj));
  getOrShowBooks();
}

// ------------------------------------------------------------------------------------------------//
//---------------------------// SOURCE CODE BY VISHAL BHARDWAJ  //---------------------------------//
