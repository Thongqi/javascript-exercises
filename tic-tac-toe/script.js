//create user


document.addEventListener('DOMContentLoaded', function() {

    
    console.log ({user, comp});
    var select = document.querySelectorAll('input[name="user-select"]');

    storeSelect(select);
    

})

function userclick(e){
    //check if the grid is empty
    console.log(e);

    // change dom
    if(e.innerHTML == ''){
        console.log(user.selected);
        e.innerHTML = (user.selected=='cross')?'x':'o';
        e.classList.add(user.selected);
    }

    // check if win
    checkWin(user)

    // computer's turn
    compPlay()
}

const createUser = function(){
    let score = 0;

    const selected = 'cross' //default

    const addscore = () => {
        return score++;
    }

    return ({selected, addscore})
}
const user = createUser();

const comp = createUser();

function storeSelect(select){
    select.forEach((item) => {
        item.addEventListener('click', function(e){
           if (e.target.checked){
               user.selected = e.target.getAttribute('data-selected');
               comp.selected = e.target.getAttribute('data-selected')=='cross'?'circle':'cross';
               console.log({select: user.selected, comp: comp.selected});
           }
       })
   })
}

//check if a line
function checkWin(player){
    const container = document.querySelector('.container');

    let grids = container.querySelectorAll(`.${player.selected}`);
    let gridnumbers = [];
    Array.from(grids).map(item => gridnumbers.push(item.id));

    gridnumbers = gridnumbers.map(item => parseInt(item.slice(5)));

    gridnumbers.sort();
    if (gridnumbers.length >= 3){
        
        let result
        let checker = (arr, target) => target.every(v => arr.includes(v))
        for (set of winCondition)  {
            console.log(set)
            if (checker(gridnumbers, set)){
                result = true;
                player==comp?alert('You lose ~(>_<。)＼'):alert('You Win ! (≧∇≦)ﾉ')
                break;
            }

        };
    }
}



function compPlay(){
    var container = document.querySelector('.container')
    var availablegrid = Array.from(container.querySelectorAll('div'));

    availablegrid = availablegrid.filter(item => !item.classList.contains(`.${user.selected}`));

    var index = Math.floor(Math.random() * availablegrid.length);

    document.querySelector(`#cont-${index}`).innerHTML = comp.selected;

    checkWin(comp)
}


// difference between location of grid is 1 (with condition the lowest number shall be {1,4,7})/3/4, when 3 x 3
const winCondition = [
    [1,2,3],
    [4,5,6],
    [7,8,9,],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]
