import "./style.css";
import { home } from "./home.js";
import { menu } from "./menu.js";
import { about } from "./about.js";


navBar();
home();
changePage();

function navBar(){
    const navbaritems = ['HOME', 'MENU', 'ABOUT'];

    for( let i = 0; i < navbaritems.length; i++){
        const button = document.createElement('button');
        button.innerHTML = navbaritems[i];
        button.id = navbaritems[i].toLowerCase();
    
        var navbar = document.querySelector('nav');
        navbar.appendChild(button);
    }
}

export function clearContent(){
    document.querySelector('#content').innerHTML = '';
}

function changePage(){
    const lists = Array.from(document.querySelectorAll('nav button'));
    lists.forEach(button => {
        button.addEventListener('click', function(e){
            clearContent();
            switch (e.target.id){
                case 'home':
                    home();
                    break;
                
                case 'menu':
                    menu();
                    break;
    
                case 'about':
                    about();
                    break;
                
                default:
                    home();
                    break;
            };
        });
    })
           

}




console.log('hi');