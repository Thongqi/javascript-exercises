const publicLibrary = []
const personalLibrary = []

document.addEventListener('DOMContentLoaded', function(){
    createBooks()

    window.onclick = function(e){
        console.log(e.target)
        if (!e.target.classList.contains('book')){
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
    
    var addbook = document.querySelector('#add-book')
    addbook.addEventListener('click', function(){
        displayForm()
    })
    
})

addBooktoPublicLibrary(
    '嫌われる勇気',
    '岸見 一郎',
    '296',
    true,
)

addBooktoPublicLibrary(
    'A Man Called Ove',
    'Fredrik Backman',
    '337',
    true,
)

addBooktoPublicLibrary(
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

function addBooktoPublickLibrary(title, author, pages, read){
    var book = new Book (title, author, pages, read)
    publicLibrary.push(book)
}

function addBooktoPersonalLibrary(title, author, pages, read){
    var book = new Book (title, author, pages, read)
    publicLibrary.push(book)
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
        var bookcolor = randomColor()
        console.log(bookcolor)
        book.style.backgroundColor = bookcolor

        var fontcolor = checkBrightness(bookcolor)
        book.style.color = fontcolor
        
        rack.append(book)
    })
}

function randomColor () {
    "use strict"
  
    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  

    var h = randomInt(0, 360)
    var s = randomInt(42, 98)
    var l = randomInt(40, 90)
    return `hsl(${h},${s}%,${l}%)`

}

function checkBrightness(color){
    let sep = color.indexOf(",") > -1 ? "," : " ";
    hsl = color.substr(4).split(")")[0].split(sep);

    let h = hsl[0],
      s = hsl[1].substr(0,hsl[1].length - 1) / 100,
      l = hsl[2].substr(0,hsl[2].length - 1) / 100;

    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const r = 255 * f(0)
    const g = 255 * f(8)
    const b = 255 * f(4)

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 127) {
        // pick a different colour
        return 'white'
    }
    else{
        return 'black'
    }
}

function displayForm (){
    document.querySelector('.form-add-boook').style.display = 'block'

    var addbutton = document.querySelector('#add-personal-book')
    addbutton.addEventListener('click', function(){
        var title = document.querySelector('#addtitle')

        if (!title){
            document.querySelector('.msg').innerHTML = 'Title is required'
        }

        else{
            var author = document.querySelector('#addauthor')
            var pages = document.querySelector('#addpages')
            var read = document.querySelector('#addread')
            console.log(title, author, pages, read)

            addBooktoPersonalLibrary(title, author, pages, read)
        }

    })
}