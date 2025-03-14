//create user
document.addEventListener('DOMContentLoaded', function() {

    const user = createUser();

    const comp = createUser();
    var select = document.querySelectorAll('input[name="user-select"]')

    select.addEventListener('click', function(){
        select.forEach((item) => {
            if (item.checked){
                user.selected(item.getAttribute('data-selected'));
                comp.selected(item.getAttribute('data-selected')=='cross'?'circle':'cross');
                console.log(user.selected(), comp.selected)
            }
        })
    })
    
})

const createUser = (function(){
    let score = 0;

    const selected = (selected) => {
        return selected;
    }

    const addscore = () => {
        return score++;
    }
})

//check if a line
function checkWin(){
    const container = document.querySelector('.container')


}

function click(e){
    //check if the grid is empty
    if(e.target.innerHTML == ''){

    }
}

// difference between location of grid is 1 (with condition the lowest number shall be {1,4,7})/3/4, when 3 x 3
const winCondition = [1, 3, 4]
