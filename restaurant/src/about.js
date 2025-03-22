export function about(){
    const h1 = document.createElement('h2');
    h1.innerHTML = 'ABOUT US';
    
    const about = document.createElement('p');
    about.innerHTML = "Welcome to The Wild Feast, the coziest dining spot in the heart of nature! Here, animals from all walks of life gather to enjoy fresh, seasonal meals inspired by the forest, rivers, and meadows. Whether you're a bear craving a midnight honey snack or a squirrel looking for a hearty breakfast, our doors are always open.";

    const h2 = document.createElement('h3');
    h2.innerHTML = 'Operating Hours';

    const hours = document.createElement('p');
    hours.innerHTML = 'Open 24/7 – because nature never sleeps!';

    const content = document.createElement('div');
    content.append(h1, about, h2, hours);

    document.querySelector('#content').appendChild(content);
}