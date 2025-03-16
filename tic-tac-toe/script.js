//create user


document.addEventListener('DOMContentLoaded', function() {

    
    console.log ({user, comp});
    var select = document.querySelectorAll('input[name="user-select"]');

    storeSelect(select);
    
    displayScore();
})

function displayScore(){
    var userscore = document.querySelector('#user-score')
    var compscore = document.querySelector('#comp-score')

    userscore.innerHTML = user.getScore();
    compscore.innerHTML = comp.getScore();
}

function userclick(e){
    //check if the grid is empty
    console.log(e);

    // change dom
    if(e.classList.length == '0'){
        console.log(user.selected);
        e.classList.add(user.selected);
    }

    // check if win
    checkWin(user)
}

const createUser = function(pname, selected){
    let score = 0;

    this.name = pname;

    this.selected = selected;
    
    const getScore = () => {
        return score;
    }

    const addscore = () => {
        return score++;
    }

    return ({selected, addscore, name, getScore})
}
const user = createUser('user', 'cross');

const comp = createUser('comp', 'circle');

function storeSelect(select){
    select.forEach((item) => {
        item.addEventListener('click', function(e){
           if (e.target.checked){
               user.selected = e.target.getAttribute('data-selected');
               comp.selected = e.target.getAttribute('data-selected')=='cross'?'circle':'cross';
               console.log({select: user.selected, comp: comp.selected});
           }
           document.querySelector(`#comp-${comp.selected}`).checked = true;
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
    let result;
    if (gridnumbers.length >= 3){
        let checker = (arr, target) => target.every(v => arr.includes(v))
        for (set of winCondition)  {
            console.log(set)
            if (checker(gridnumbers, set)){
                result = true;
                announceWinner(player);
                break;
            }
            
        };
    }
    if(gridnumbers.length > 4 && !result){
        announceWinner('Tie')
    }

    if (!result && player.name == 'user'){
        // computer's turn
        setTimeout(() => {
            compPlay()
        }, 1000); 
    }
}

function announceWinner(player){
    if(player == 'Tie'){
        alert("It's a tie")
    }
    else{
        player.name=='comp'?alert('You lose ~(>_<。)＼'):alert('You Win ! (≧∇≦)ﾉ');
        player.addscore();
    }
    
    // clear class
    var container = document.querySelector('.container');
    var gridlists = Array.from(container.querySelectorAll('div'));

    gridlists.map(grid => grid.classList.remove('cross', 'circle'));

    displayScore();
}




function compPlay(){
    var container = document.querySelector('.container')
    var availablegrid = Array.from(container.querySelectorAll('div'));
    var oppgrid = Array.from(container.querySelectorAll(`.${user.select}`));

    availablegrid = availablegrid.filter(item => item.classList.length == '0');
    availablegrid = availablegrid.map(item => item.id.slice(5));


    // first move if can, choose from 1,3,7,9
    var evengrid = availablegrid.filter(item => item % 2 != '0');
    console.log(evengrid)
    if(oppgrid.length < 2){
        var index = Math.floor(Math.random() * evengrid.length);

        index = evengrid[index];
    }
    else{
        var index = blockOpp(availablegrid. oppgrid)

        if(!index){
            var index = Math.floor(Math.random() * availablegrid.length);

            index = availablegrid[index];
        }
       
    }
    // document.querySelector(`#cont-${index}`).innerHTML = comp.selected=='circle'?'o':'x';
    document.querySelector(`#cont-${index}`).classList.add(comp.selected);

    checkWin(comp)
}

function blockOpp(availablegrid, oppgrid){
    oppgrid = oppgrid.map(item => item.id.slice(5));

    for(set of winCondition){
        let result = set.filter(i => oppgrid.includes(i))
        if(result.length >= 2){
            let value = set.filter(i => !oppgrid.includes(i));
            console.log(result, value)
            // check if the grid is empty
            if(!availablegrid.includes(value[0])){
                return value;
                break;
            }
        }
        return false;
    }


}


// difference between location of grid is 1 (with condition the lowest number shall be {1,4,7})/3/4, when 3 x 3
const winCondition = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]
