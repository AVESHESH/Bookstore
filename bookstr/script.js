document.addEventListener('DOMContentLoaded', () => {
    loadBooks();

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteBook);
    });

    document.getElementById('book-list').addEventListener('click', toggleFavorite);
});

function addBook() {
    const bookTitle = prompt("Enter the book title:");
    if (bookTitle) {
        const bookList = document.getElementById('book-list');
        const newBook = document.createElement('li');
        newBook.innerHTML = `${bookTitle} <button class="delete-btn">Delete</button>`;
        newBook.querySelector('.delete-btn').addEventListener('click', deleteBook);
        bookList.appendChild(newBook);
        saveBooks();
    }
}

function searchBook() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const books = document.querySelectorAll('#book-list li');
    
    books.forEach(book => {
        if (book.textContent.toLowerCase().includes(searchTerm)) {
            book.style.backgroundColor = 'yellow';
        } else {
            book.style.backgroundColor = ''; // Reset background if it doesn't match
        }
    });
}

function removeBook() {
    const bookList = document.getElementById('book-list');
    if (bookList.lastElementChild) {
        const confirmation = confirm("Are you sure you want to remove the last book?");
        if (confirmation) {
            bookList.removeChild(bookList.lastElementChild);
            saveBooks();
        }
    } else {
        alert("There are no books to remove.");
    }
}

function deleteBook(event) {
    event.target.parentElement.remove();
    saveBooks();
}

function toggleFavorite(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('favorite');
        saveBooks();
    }
}

function clearSearchHighlights() {
    const books = document.querySelectorAll('#book-list li');
    books.forEach(book => {
        book.style.backgroundColor = '';
    });
}

function saveBooks() {
    const books = [];
    document.querySelectorAll('#book-list li').forEach(book => {
        const title = book.childNodes[0].textContent.trim();
        const favorite = book.classList.contains('favorite');
        books.push({ title, favorite });
    });
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach(book => {
        const newBook = document.createElement('li');
        newBook.innerHTML = `${book.title} <button class="delete-btn">Delete</button>`;
        if (book.favorite) {
            newBook.classList.add('favorite');
        }
        newBook.querySelector('.delete-btn').addEventListener('click', deleteBook);
        bookList.appendChild(newBook);
    });
}
