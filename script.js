//MODULE FOR GAMEBOARD OBJECT

const GameBoard=(()=>{

    let gameBoardArray=["","","","","","","","",""];

    const renderOnScreen=()=>{
        let boardHTML="";
        gameBoardArray.forEach((box,index)=>{
            boardHTML+=`<div id="box-${index}" class="box" >${box}</div>`;
        });

        document.querySelector("#gameBoard").innerHTML=boardHTML;

        
    }

    return{
        renderOnScreen
    }

})();

//FACTORY FOR PLAYERS
const createPlayer=(name,gameMark)=>{
    return{
        name,
        gameMark
    }
}

//MODULE FOR CONTROLLING THE GAME
const Game=(()=>{
    let players=[];
    let currentPlayerIndex;
    let gameOver;

    const startGame=()=>{
        //Since there can be more than two players , we initialize player in FACTORY
        players=[
            createPlayer(document.querySelector("#playerOne").value,"X"),
            createPlayer(document.querySelector("#playerTwo").value,"O")]
        
        currentPlayerIndex=0;
        gameOver=false;
        GameBoard.renderOnScreen();
    }
    return{
        startGame
    }

})();


const startButton=document.querySelector("#startGame");
startButton.addEventListener("click",()=>{
    Game.startGame();
})