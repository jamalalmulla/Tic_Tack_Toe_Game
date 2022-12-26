let currentPlayer
// Start Audio
$(document).ready(function() {
    $("audio")[3].play();
});

//Show the score
$("#score").text(`Score: X= ${sessionStorage.getItem("X")||0}, O= ${sessionStorage.getItem("O")||0}`)
// Generate a random turn. Either X or O 
if (sessionStorage.getItem("X") === null && sessionStorage.getItem("O") === null
    || sessionStorage.getItem("draw") === 'true') {
    randomPlayer();
}
else {   
    currentPlayer = sessionStorage.getItem("lastWinner")
}

// update the turn div
$('.turn').text("It is your turn Mr\\Ms. " + currentPlayer)


// create an array to save the state
let gridState = ["", "", "", "", "", "", "", "", ""];
// iterate over the 9 cells
for (let i = 0; i <= 9; i++) {
    
    console.log(`cell${i}`);
// cell on click event listener
    $(`#cell${i}`).on("click", function () {
        
    console.log(`Cell index is: cell ${i - 1}`);
    console.log("Current Player:", currentPlayer)
// if the cell is already chosen
    if ($(`#cell${i}`).text() !== '') { alert("Choose another cell please!")}
    else {
        //decide audio
        let audio = $("audio")[1];
        audio.play();
        // update the cell mark with the player X or O
        $(`#cell${i}`).text(currentPlayer) ////////////////////////////////////////////////////
        // cell background manipulation
        if (currentPlayer =='X')
        $(`#cell${i}`).css("background-color", "yellow")
        else if ( currentPlayer === 'O')
        {$(`#cell${i}`).css("background-color", "green")}
        
// update the gridState array with the latest state
        gridState[i - 1] = $(`#cell${i}`).text()
// Validate the state of wining or draw
        validateWinner(gridState,i,currentPlayer);
        console.log(`GridState ${i}: `, gridState[i - 1])
        console.log(gridState)
// Change the turn
        if (currentPlayer === "X") {
            currentPlayer = "O"
            console.log("Turn1:", currentPlayer)
        } else {
            currentPlayer = "X"
            console.log("Turn2:", currentPlayer)
        }
        $('.turn').text("It is your turn Mr\\Ms. " + currentPlayer);
        }
    });
};



function randomPlayer() {
    let random = ['true', 'false'][Math.round(Math.random())]
    currentPlayer = random === 'true' ? 'X' : 'O';
    console.log(currentPlayer)
}

function validateWinner(state,i) {
    
    if (state[0] === state[1] && state[0] === state[2] && state[0] !== ''       //1
        || state[3] === state[4] && state[3] === state[5] && state[3] !== ''    //2
        || state[6] === state[7] && state[6] === state[8] && state[6] !== ''    //3
        || state[0] === state[3] && state[0] === state[6] && state[0] !== ''    //4
        || state[1] === state[4] && state[1] === state[7] && state[1] !== ''    //5
        || state[2] === state[5] && state[2] === state[8] && state[2] !== ''    //6
        || state[0] === state[4] && state[0] === state[8] && state[0] !== ''    //7
        || state[2] === state[4] && state[2] === state[6] && state[2] !== ''    //8
    ) {
        $('#turn').hide();
        
        if (
            setTimeout(function () {
             // Save the score in the session storage 
            if (sessionStorage.getItem(state[i - 1])) {
                console.log("1 state[i - 1]: ", state[i - 1])
                sessionStorage.setItem(state[i - 1], String(Number(sessionStorage.getItem(state[i - 1])) + 1));
                sessionStorage.setItem("lastWinner",state[i - 1])
            } else {
                 console.log("2 state[i - 1]: ", state[i - 1])
                sessionStorage.setItem(state[i - 1], "1");
                sessionStorage.setItem("lastWinner",state[i - 1])
                }
                
            sessionStorage.setItem("draw","false")
            ///////////////////////////////////////
            //Show an alert for the winner and the score
            audio = $("audio")[0];
            audio.play();
            alert(`We have a winner!!! ${state[i - 1]} won this round. Congratulations.
            Score: X= ${sessionStorage.getItem("X") || 0}, O= ${sessionStorage.getItem("O") || 0})
            Lets play again!`)

            window.location.reload();  
            }, 1)
        ) {}
        $("#score").text(`Score: X= ${sessionStorage.getItem("X")}, O= ${sessionStorage.getItem("O")}`) 
    }
    // If it is a draw game just reload the page
    else if (!gridState.includes("")) {

        $('#turn').hide();
        //draw sound
        let audio = $("audio")[2];
        audio.play();

        if (setTimeout(function () {
            alert(`Draw Game. Lets Play again!`)
            sessionStorage.setItem("draw","true")
            window.location.reload();
        },1000)) { }       
    } 
}


