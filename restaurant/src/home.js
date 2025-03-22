import { about } from "./about";
import { clearContent } from ".";

export function home(){
    const title = document.createElement('h1');
    title.innerHTML = 'The Hungry Hollow';

    const slogan = document.createElement('p');
    slogan.innerHTML = 'Welcome to The Wild Feast – Where Every Animal Dines in Style!'

    const cta = document.createElement('button');
    cta.classList.add('cta');
    cta.innerHTML = 'KNOW MORE';

    const content = document.createElement('div');
    content.append(title, slogan, cta);
    content.addEventListener('click', ()=> {
        clearContent();
        about();

    })

    document.querySelector('#content').appendChild(content);
};

