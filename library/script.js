const myLibrary = []

document.addEventListener('DOMContentLoaded', function(){
    createBooks()

    var bookslist = document.querySelectorAll('.book')
    bookslist.forEach(function(book){
        book.addEventListener('click', function(book){
            displayBook('modal-1')
        })
    })

    window.addEventListener('click', closeBook())
    
})

addBooktoLibrary(
    '嫌われる勇気',
    '岸見 一郎',
    '296',
    true,
)

addBooktoLibrary(
    'A Man Called Ove',
    'Fredrik Backman',
    '337',
    true,
)

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBooktoLibrary(title, author, pages, read){
    var book = new Book (title, author, pages, read)
    myLibrary.push(book)
}

function displayBook(bookmodal){
    var bookmodals = document.querySelector(`#${bookmodal}`)
    bookmodals.style.display = 'block'
}

function closeBook(){
    document.querySelectorAll('.bookmodal').forEach((modal) => {
        modal.style.display = 'none'
    })
}

function createBooksModal(){
    
    myLibrary.map((item) => {
        var book = document.createElement('div')
        book.id = item.id
        book.classList.add('book')

        var title = document.createElement('h2')
        title.innerHTML = item.title

        var author = document.createElement('p')
        author.innerHTML = item.author

        var pages = document.createElement('p')
        pages.innerHTML = item.pages

        book.append(title, author, pages)
        rack.append(book)
    })
}

function createBooks(){
    var rack = document.querySelector('.rack')
    myLibrary.map((item) => {
        var book = document.createElement('div')
        book.id = item.id
        book.classList.add('book')

        rack.append(book)
    })
}