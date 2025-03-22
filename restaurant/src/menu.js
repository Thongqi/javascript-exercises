export function menu(){
    const h1 = document.createElement('h1');
    h1.innerHTML = 'MENU';

    const h2 = document.createElement('h2');
    h2.innerHTML = 'We serve what the forest provides today—fresh, wild, and full of surprises!'

    const p = document.createElement('p');
    p.innerHTML = 'Just like the wind changes direction, so does our menu. Some days, it’s a feast fit for a bear, with honey-glazed fish and roasted nuts. Other days, it’s a light, leafy meal perfect for a rabbit on the run. Take a seat, and let nature surprise you!';

    const content = document.createElement('div');
    content.append(h2, p);

    document.querySelector('#content').appendChild(content);
};