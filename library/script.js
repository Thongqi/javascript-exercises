var publicLibrary = []
var personalLibrary = []

var MutationObserver = window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        
    });
    observer.disconnect();
    console.log('pausing the observer');
    // If needed for your use case, start observing in 1 second
    setTimeout(() => observer.observe(), 1000);
});

document.addEventListener('DOMContentLoaded', function(){
    createBooks('public')

    

    window.addEventListener('click', function(e){
        console.log(e.target)
        
        // close modal
        if (!e.target.classList.contains('book') && !e.target.classList.contains('modal-content') && !e.target.classList.contains('remove') && !e.target.classList.contains('read')){
            closeBook()
        }
        else if(e.target.classList.contains('book')){
            displayBook(e.target.getAttribute('id'))
        }
    }) 

    var addbook = document.querySelector('#add-book')
    addbook.addEventListener('click', function(){
        displayForm()

    })

    
  

    console.log(window)
    
    
    
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
    true,
)

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBooktoPublicLibrary(title, author, pages, read){
    var book = new Book (title, author, pages, read)
    publicLibrary.push(book)
}

function addBooktoPersonalLibrary(title, author, pages, read){
    var book = new Book (title, author, pages, read)
    personalLibrary.push(book)
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
    console.log(publicLibrary)

    // check which rack is the book selected from
    if(publicLibrary.filter((item) => item.id == bookid).length > 0){
        var item = publicLibrary.filter((item) => item.id == bookid)
    }
    else{
        var item = personalLibrary.filter((item) => item.id == bookid)
    }

    console.log(item)
    var title = parentmodal.querySelector('.title')
    title.innerHTML = item[0].title

    var author =parentmodal.querySelector('.author')
    author.innerHTML = item[0].author

    var pages = parentmodal.querySelector('.pages')
    pages.innerHTML = item[0].pages

    var read = parentmodal.querySelector('.read')
    read.innerHTML = item[0].read?'Read':'In progress'

    parentmodal.style.backgroundColor = document.getElementById(`${bookid}`).style.backgroundColor
    parentmodal.style.color = document.getElementById(`${bookid}`).style.color
    
}

function createBooks(people){

    if (people == 'public'){
        var rack = document.querySelector('.publicrack')
        rack.innerHTML = ''
        publicLibrary.map((item) => {
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
    else if (people == 'personal'){
        var rack = document.querySelector('.personalrack')

        rack.innerHTML = ''

        personalLibrary.map((item) => {
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
    document.querySelector('.form-add-book').style.display = 'block'
    closeForm()
}

function addBook(e){
    var title = document.querySelector('#addtitle').value

    if (!title){
        document.querySelector('.msg').innerHTML = 'Title is required'
    }

    else{
        var author = document.querySelector('#addauthor').value
        var pages = document.querySelector('#addpage').value
        var read = document.querySelector('#addread').checked?'True':'False'
        console.log(title, author, pages, read)

        addBooktoPersonalLibrary(title, author, pages, read)

        createBooks('personal')

        document.querySelector('.form-add-book').style.display = 'none' 
    }
}


function toggleReadStatus(shownbook){
    var book = shownbook.parentElement.querySelector('.title').innerHTML

    if(publicLibrary.some(e => e.title == book)){
        var rack = publicLibrary
        var people = 'public'
    }
    else{
        var rack = personalLibrary
        var people = 'personal'
    }

    rack.map((item) => {
        if (item.title == book){
            item.read = !item.read
            shownbook.innerHTML = item.read?'Read':'In progress'
        }
    })

}

function removeBook(item){
    var book = item.previousElementSibling.querySelector('.title').innerHTML

    if(publicLibrary.some(e => e.title == book)){
        var rack = publicLibrary
        var people = 'public'
    }
    else{
        var rack = personalLibrary
        var people = 'personal'
    }

    var newlibrary = rack.filter((item) => item.title != book)
    console.log(rack)
    // update library
    if(people == 'public'){
        publicLibrary = newlibrary
    }
    else{
        personalLibrary = newlibrary
    }
    closeBook()

    console.log(publicLibrary)
    createBooks(people)

}

function closeForm(){
    var closeform = document.querySelector('.close')

    closeform.addEventListener('click', function(){
        var form = document.querySelector('.form-add-book')
        form.style.display = 'none'
    })
}
