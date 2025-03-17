//create user
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

const playGame = function() {
    let round = 0;

    const addRound = function(){
        round++;
    }

    const getRound = () => {
        return round;
    }

    return({addRound, getRound})

}


const user = createUser('user', 'circle');
const comp = createUser('comp', 'cross');
const game = playGame();

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
    checkWin(user);
}

function disableClick(){
    var grids = Array.from(document.querySelectorAll('.container div'));

    grids.forEach(item => item.onclick = '#');
}

function enableClick(){
    var grids = Array.from(document.querySelectorAll('.container div'));
    grids.forEach(item => item.onclick = function() {userclick(this)});
}



function storeSelect(select){
    select.forEach((item) => {
        item.addEventListener('click', function(e){
           if (e.target.checked){
               user.selected = e.target.getAttribute('data-selected');
               comp.selected = e.target.getAttribute('data-selected')=='cross'?'circle':'cross';
               console.log({select: user.selected, comp: comp.selected});
           }
           document.querySelector(`#comp-${comp.selected}`).checked = true;

        //    change current tictactoe disaply
           var oriuser = Array.from(document.querySelectorAll(`.${user.selected}`))
           var oricomp = Array.from(document.querySelectorAll(`.${comp.selected}`))

           oriuser.forEach(item => {
                item.classList.remove(user.selected)
                item.classList.add(comp.selected)
           })

           oricomp.forEach(item => {
                item.classList.remove(comp.selected)
                item.classList.add(user.selected)
            })

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
        announceWinner('Tie');
        result = true;
    }

    // if havent endgame, continue
    if (!result && player.name == 'user'){
        disableClick();
        // computer's turn
        setTimeout(() => {
            compPlay();
            enableClick();
        }, 1000); 
    }
}

function announceWinner(player){
    if(player == 'Tie'){
        alert("It's a tie")
    }
    else{
        player.name == 'comp'?alert('You lose ~(>_<。)＼'):alert('You Win ! (≧∇≦)ﾉ');
        player.addscore();
    }

    // clear class
    var container = document.querySelector('.container');
    var gridlists = Array.from(container.querySelectorAll('div'));

    gridlists.map(grid => grid.classList.remove('cross', 'circle'));

    displayScore();

    setTimeout(() => {
        play();
    }, 1000);

}

function play(){
    game.addRound();

    // change starting player
    if (game.getRound() % 2 != 0){
        disableClick();
        compPlay();
        enableClick();
    }
}

function compPlay(){
   
    let gridnumber = nextMove();
    // document.querySelector(`#cont-${index}`).innerHTML = comp.selected=='circle'?'o':'x';
    document.querySelector(`#cont-${gridnumber}`).classList.add(comp.selected);

    checkWin(comp);
}

function nextMove (){
    var container = document.querySelector('.container')
    var availablegrid = Array.from(container.querySelectorAll('div'));
    var oppgrid = Array.from(container.querySelectorAll(`.${user.selected}`));

    availablegrid = availablegrid.filter(item => item.classList.length == '0');
    availablegrid = availablegrid.map(item => parseInt(item.id.slice(5)));

    // first move if can, choose from 1,3,7,9
    var evengrid = availablegrid.filter(item => item % 2 != '0');

    var index;
    if(oppgrid.length < 2){
        index = getIndex(evengrid);
    }
    else{
        index = blockOpp(availablegrid, oppgrid);

        if(!index){
            if(evengrid.length > 0){
                index = getIndex(evengrid);
            }
            else{
                index = getIndex(availablegrid);
            }        
        }
        
    }
    return index;
}

function getIndex(grids){
    index = Math.floor(Math.random() * grids.length);
    return grids[index];
}

function blockOpp(availablegrid, oppgrid){
    oppgrid = oppgrid.map(item => parseInt(item.id.slice(5)));

    if (!trytoWin(availablegrid)){
        for(set of winCondition){
            let result = set.filter(i => oppgrid.includes(i));
            if(result.length >= 2){
                let value = set.filter(i => !oppgrid.includes(i));
                // check if the grid is empty
                if(availablegrid.includes(value[0])){
                    return value[0];
                    break;
                }
            }
        }
    }
    else{
        return trytoWin(availablegrid);
    }
    
}

function trytoWin(availablegrid){
    var compgrid = Array.from(document.querySelectorAll(`.container .${comp.selected}`));
    compgrid = compgrid.map(item => parseInt(item.id.slice(5)));

    for(set of winCondition){
        let result = set.filter(i => compgrid.includes(i));
        if(result.length >= 2){
            let value = set.filter(i => !compgrid.includes(i));
            // check if the grid is empty
            if(availablegrid.includes(value[0])){
                return value[0];
                break;
            }
        }
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
