const myLibrary = []

document.addEventListener('DOMContentLoaded', function(){
    createBooks()

    var bookslist = document.querySelectorAll('.book')
    bookslist.forEach(function(book){
        book.addEventListener('click', function(book){
            displayBook(book.getAttribute('id'))
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

function displayBook(bookid){
    var bookmodal = document.querySelector('bookmodal')
    bookmodal.style.display = 'block'
    createBooksModal(bookmodal, this.bookid)
}

function closeBook(){
    document.querySelectorAll('.bookmodal').forEach((modal) => {
        modal.style.display = 'none'
    })
}

function createBooksModal(bookmodal, bookid){
    var parentmodal = bookmodal
    var item = myLibrary.filter((item) => item.id == bookid )

    var title = parentmodal.querySelector('.title')
    title.innerHTML = item.title

    var author =parentmodal.querySelector('.author')
    author.innerHTML = item.author

    var pages = parentmodal.querySelector('.author')
    pages.innerHTML = item.pages
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