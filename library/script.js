const myLibrary = []

document.addEventListener('DOMContentLoaded', function(){
    createBooks()

    window.onclick = function(e){
        console.log(e.target)
        closeBook
    }

    var bookslist = document.querySelectorAll('.book')
    bookslist.forEach(function(book){
        book.addEventListener('click', function(){
            displayBook(this.getAttribute('id'))
        })
    })
    console.log(window)
    
    
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
    var bookmodal = document.querySelector('.book-modal')
    bookmodal.style.display = 'block'
    createBooksModal(bookmodal, bookid)
}

function closeBook(){
    document.querySelector('.book-modal').style.display = 'none'

}

function createBooksModal(bookmodal, bookid){
    var parentmodal = bookmodal
    console.log(myLibrary)
    var item = myLibrary.filter((item) => item.id == bookid )
    console.log(item)
    var title = parentmodal.querySelector('.title')
    title.innerHTML = item[0].title

    var author =parentmodal.querySelector('.author')
    author.innerHTML = item[0].author

    var pages = parentmodal.querySelector('.pages')
    pages.innerHTML = item[0].pages
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