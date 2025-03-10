const myLibrary = []

document.addEventListener('DOMContentLoaded', function(){
    createBooks()

    window.onclick = function(e){
        console.log(e.target)
        if (e.target != document.querySelector('.book')){
            closeBook()
        }
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

addBooktoLibrary(
    'Between Two Kingdoms: A Memoir of a Life Interrupted',
    'Suleika Jaouad ',
    '368',
    true
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

    parentmodal.style.backgroundColor = document.querySelector(`#${bookid}`).style.backgroundColor
    parentmodal.style.color = document.querySelector(`#${bookid}`).style.color
}

function createBooks(){
    var rack = document.querySelector('.rack')
    myLibrary.map((item) => {
        var book = document.createElement('div')
        book.id = item.id
        book.classList.add('book')

        // add title to book case
        book.innerHTML = item.title

        //random color the book
        var bookcolor = '#' + randomColor
        console.log(bookcolor)
        book.style.backgroundColor = bookcolor

        var fontcolor = checkBrightness(bookcolor)
        book.style.color = fontcolor
        
        rack.append(book)
    })
}

const randomColor = (() => {
    "use strict";
  
    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    return () => {
      var h = randomInt(0, 360);
      var s = randomInt(42, 98);
      var l = randomInt(40, 90);
      return `hsl(${h},${s}%,${l}%)`;
    };
})();

function checkBrightness(color){
    var c = color.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 127) {
        // pick a different colour
        return 'white'
    }
    else{
        return 'black'
    }
}

 