// Select all box elements (each cell of the Tic-Tac-Toe grid)
let boxes=document.querySelectorAll(".box")

// Select restart and new game buttons
let restartBtn=document.querySelector("#restart-btn")
let newBtn=document.querySelector("#new-btn")
let msgContainer=document.querySelector(".msgContainer")
let msg=document.querySelector("#msg")

let turnO=true

const winningPatterns=[                          // All possible winning combinations based on box index positions
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        //console.log("box was clicked")
        if(turnO){
            box.innerText="O"
            turnO=false
        }else{
            box.innerText="X"
            turnO=true
        }
        box.disabled=true

        checkWinner();
    })
    
})

// Restart button functionality: reset board and hide message
restartBtn.addEventListener("click",()=>{
    msgContainer.classList.add("hide")
    for(let box of boxes){
        box.innerText=""
        btn_enable()
    }
})

// New game button (same as restart)
newBtn.addEventListener("click",()=>{
    msgContainer.classList.add("hide")
    for(let box of boxes){
        box.innerText=""
        btn_enable()
    }
})

// Disable all boxes — used after someone wins
const btn_disable=()=>{
    for(let box of boxes){
        box.disabled=true
    }
}

// Enable all boxes — used on restart or new game
const btn_enable=()=>{
    for(let box of boxes){
        box.disabled=false
    }
}

// Show winner message
const showWinner=(winner)=>{
    msg.innerText=`Congratulation !! Winner is ${winner}`
    msgContainer.classList.remove("hide")
}

// Check for winner or draw
const checkWinner=()=>{
    let winnerFound=false

    for(pattern of winningPatterns){
        let pos1Val=boxes[pattern[0]].innerText
        let pos2val=boxes[pattern[1]].innerText
        let pos3val=boxes[pattern[2]].innerText

         // Make sure none of the positions are empty before checking
        if(pos1Val!="" && pos2val!="" && pos3val!=""){      

            if(pos1Val ===pos2val && pos2val===pos3val){
                //console.log("winner")
                showWinner(pos1Val)
                btn_disable()
                
                winnerFound=true
                return  // Exit the function early
            }
        }
    }

    // If all boxes filled and no winner, it's a draw
    let allFilled=true
    for(let box of boxes){
        if(box.innerText===""){
            allFilled=false
            break
        }
    }

    if(allFilled && !winnerFound){
        msg.innerText="Game is Draw"
        msgContainer.classList.remove("hide")
    }
}