console.log("Welcome to Library");

//constructor to make book

function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//Display Constructor

function Display() {}

//Add methods to Display Prototype

Display.prototype.add = function (book) {
  let tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>`;
  tableBody.innerHTML += uiString;
};

//Reset Form

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

//Validate function

Display.prototype.validate = function (book) {
  if (book.name.length < 3 || book.author.length < 3) return false;
  return true;
};

//Show Function
Display.prototype.show = function (response) {
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
};

//Add Submit Event Listener to form

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

// ------------------------------------------------------------------------------------------------//
//---------------------------// SOURCE CODE BY VISHAL BHARDWAJ  //---------------------------------//
