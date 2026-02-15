const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add a prototype function to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Remove a book from the library by id
function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index > -1) {
    myLibrary.splice(index, 1);
  }
}

// Display all books in the library
function displayBooks() {
  const bookContainer = document.querySelector(".book-container");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-id", book.id);

    bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> <span class="read-status">${book.read ? "Read" : "Not Read"}</span></p>
      <div class="book-actions">
        <button class="toggle-read-btn" data-id="${book.id}">
          ${book.read ? "Mark as Unread" : "Mark as Read"}
        </button>
        <button class="remove-btn" data-id="${book.id}">Remove</button>
      </div>
    `;

    bookContainer.appendChild(bookElement);
  });

  // Add event listeners to the new buttons
  attachBookButtonListeners();
}

// Attach event listeners to remove and toggle buttons
function attachBookButtonListeners() {
  // Remove button listeners
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      removeBookFromLibrary(id);
      displayBooks();
    });
  });

  // Toggle read status button listeners
  document.querySelectorAll(".toggle-read-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const book = myLibrary.find((b) => b.id === id);
      if (book) {
        book.toggleRead();
        displayBooks();
      }
    });
  });
}

// Handle form submission
function addBookFromForm(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  document.getElementById("book-form").reset();
}

// Fetch books from Open Library API
async function searchBooks(query) {
  const loadingSpinner = document.getElementById("loading-spinner");
  const searchResults = document.getElementById("search-results");

  loadingSpinner.classList.remove("hidden");
  searchResults.innerHTML = "";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`,
    );
    const data = await response.json();

    if (data.docs.length === 0) {
      searchResults.innerHTML =
        "<p class='no-results'>No books found. Try a different search.</p>";
      return;
    }

    // Display search results
    searchResults.innerHTML = data.docs
      .map(
        (book, index) => `
        <div class="search-result-item">
          <div class="result-info">
            <h4>${book.title}</h4>
            <p><strong>Author:</strong> ${book.author_name?.join(", ") || "Unknown"}</p>
            <p><strong>Year:</strong> ${book.first_publish_year || "Unknown"}</p>
            <p><strong>Pages:</strong> ${book.number_of_pages_median || "Unknown"}</p>
          </div>
          <button type="button" class="add-from-search-btn" data-index="${index}">
            Add to Library
          </button>
        </div>
      `,
      )
      .join("");

    // Attach event listeners to add buttons
    document.querySelectorAll(".add-from-search-btn").forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        const book = data.docs[idx];
        addBookFromSearchResult(book);
      });
    });
  } catch (error) {
    searchResults.innerHTML =
      "<p class='error'>Error fetching books. Please try again.</p>";
    console.error("API Error:", error);
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}

// Add book from API search result
function addBookFromSearchResult(book) {
  const title = book.title || "Unknown Title";
  const author = book.author_name?.[0] || "Unknown Author";
  const pages = book.number_of_pages_median || 0;

  addBookToLibrary(title, author, pages, false);
  displayBooks();

  // Clear search and close dialog
  document.getElementById("search-results").innerHTML = "";
  document.getElementById("search-input").value = "";
  bookDialog.close();
}

// Tab switching functionality
function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");

      // Remove active class from all tabs
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab
      btn.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// Search button functionality
function initializeSearchButton() {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      searchBooks(query);
    }
  });

  // Allow searching with Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        searchBooks(query);
      }
    }
  });
}

// Get the dialog and button elements
const newBookBtn = document.querySelector(".new-book-btn");
const bookDialog = document.querySelector(".book-dialog");
const closeBtn = document.querySelector(".close-btn");

// Open dialog when "New Book" button is clicked
newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

// Close dialog when close button is clicked
closeBtn.addEventListener("click", () => {
  bookDialog.close();
});

// Handle form submission
document.getElementById("book-form").addEventListener("submit", (event) => {
  addBookFromForm(event);
  bookDialog.close();
});

// Initialize tabs and search functionality
initializeTabs();
initializeSearchButton();
