//-------------MODULE FOR GAMEBOARD OBJECT----------//

const GameBoard=(()=>{

    let gameBoardArray=["","","","","","","","",""];

    const renderOnScreen=()=>{
        let boardHTML="";
        gameBoardArray.forEach((box,index)=>{
            boardHTML+=`<div id="box-${index}" class="box" >${box}</div>`;
        });

        document.querySelector("#gameBoard").innerHTML=boardHTML;


        const boxes=document.querySelectorAll(".box");
        boxes.forEach((box)=>{
        box.addEventListener("click",Game.boxClicked);
    })


        
    }

    const update=(index,value)=>{
        gameBoardArray[index]=value;
        console.log(index)
        console.log(value);
        renderOnScreen()
    }

    const getGameBoard=()=>gameBoardArray

    

    return{
        renderOnScreen,
        update,
        getGameBoard
    }

})();
//---------------END OF MODULE FOR GAMEBOARD OBJECT-------------//












//-----------------FACTORY FUNCTION FOR PLAYERS----------------------//
const createPlayer=(name,gameMark)=>{
    return{
        name,
        gameMark
    }
}
//-----------------END OF FACTORY FUNCTION FOR PLAYERS----------------------//







//--------MODULE FOR CONTROLLING THE GAME AND HERE LIES EVERY SINGLE GAME LOGIC-----------///
const Game=(()=>{
    let players=[];
    let currentPlayerIndex;
    let gameOver;

    const startGame=()=>{
        //Since there can be more than two players , we initialize player in FACTORY
        players=[
            createPlayer(document.querySelector("#playerOne").value,"X"),
            createPlayer(document.querySelector("#playerTwo").value,"O")
        ]
        document.querySelector("#area").innerHTML=`<p>->${document.querySelector("#playerOne").value} is <span>X</span> and
        
        
        ${document.querySelector("#playerTwo").value} is <span>O</span> <-</p>`

        
        currentPlayerIndex=0;
        gameOver=false;
        GameBoard.renderOnScreen();


        const boxes=document.querySelectorAll(".box");
        boxes.forEach((box)=>{
        box.addEventListener("click",Game.boxClicked);


    })
    }

    const restart=()=>{
        for(let i=0;i<9;i++)
        {
            GameBoard.update(i,"");

        }
        GameBoard.renderOnScreen();
        gameOver=false;
        document.querySelector("#display-area").innerHTML="";
    }


    const boxClicked=(e)=>{
        if(gameOver){
            return;
        }
        let index=parseInt(e.target.id.split("-")[1])
        console.log(index)

        if(GameBoard.getGameBoard()[index]!=""){
            return;
        }

        GameBoard.update(index,players[currentPlayerIndex].gameMark);

        if(winner(GameBoard.getGameBoard(),players[currentPlayerIndex].gameMark)){
            gameOver=true;
            displayMessage.showMsg(`${players[currentPlayerIndex].name} wins!`)
        }else if(checkTie(GameBoard.getGameBoard())){
            gameOver=true;
            displayMessage.showMsg("It's a TIE!")
        }

        currentPlayerIndex=currentPlayerIndex===0 ? 1:0;
    }



    return{
        startGame,
        restart,
        boxClicked
    }

})();


//-------- END MODULE FOR CONTROLLING THE GAME AND HERE LIES EVERY SINGLE GAME LOGIC-----------///



//----------------MODULE FOR DISPLAYING MESSAGE AFTER WIN OR TIE
const displayMessage=(()=>{
    const showMsg=(msg)=>{
        document.querySelector("#display-area").innerHTML=msg;
    }
    return{
        showMsg
    }
})();






//------------WINNER FUNCTION-------.//

function winner(board){
    const gameWinnningCombo=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i=0;i<gameWinnningCombo.length;i++)
    {
        const [a,b,c]=gameWinnningCombo[i];
        if(board[a] && board[a]===board[b] && board[a]===board[c]){
            return true;
        }
    }
    return false;
}


//------------ END WINNER FUNCTION-------.//


//---------------TIE FUNCTION----------------//
function checkTie(board){
    return board.every(box=>box!="")
}

//-------------END TIE FUNCTION----------//



const startButton=document.querySelector("#startGame");
startButton.addEventListener("click",()=>{
    Game.startGame();
})

const restartBtn=document.querySelector("#restartGame");
restartBtn.addEventListener("click",()=>{
    Game.restart();
})