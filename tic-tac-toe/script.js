//create user
document.addEventListener('DOMContentLoaded', function() {

    

    const user = createUser();

    const comp = createUser();
    console.log ({user, comp})
    var select = document.querySelectorAll('input[name="user-select"]')

    storeSelect(select)
    

})

const createUser = function(){
    let score = 0;

    const selected = (selected) => {
        selected
        return selected;
    }

    const addscore = () => {
        return score++;
    }

    return ({selected, addscore})
}

function storeSelect(select){
    select.forEach((item) => {
        item.addEventListener('click', function(e){
           if (e.target.checked){
               user.selected(e.target.getAttribute('data-selected'));
               comp.selected(e.target.getAttribute('data-selected')=='cross'?'circle':'cross');
               console.log({select: user.selected(), comp: comp.selected})
           }
       })
   })
}

//check if a line
function checkWin(){
    const container = document.querySelector('.container')


}

function click(e){
    //check if the grid is empty
    if(e.target.innerHTML == ''){
        console.log(user.selected())
        e.target.innerHTML == user.selected()=='cross'?'x':'o'
    }
}

// difference between location of grid is 1 (with condition the lowest number shall be {1,4,7})/3/4, when 3 x 3
const winCondition = [1, 3, 4]
