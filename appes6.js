class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
    const list = document.getElementById('book-list');
    const extra = document.getElementById('extra');
    // Create tr element
    const row = document.createElement('tr');
    // Inserting cols into the 'tr' Element
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    // const extraCnt = document.createElement('p');
    // extraCnt.innerHTML = `${book.author}`;
    // extra.appendChild(extraCnt);

    // appending the row we just created to its parent element: "list"
    list.appendChild(row);
    }

    showAlert(message, className) {
    // Create a div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    }
}

// Event Listeners 
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn ==='') {
        // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
    // Add book to List
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){
    
    // Instantiate UI
    const ui = new UI();

    // Delete Book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!', 'success')

    e.preventDefault();
})