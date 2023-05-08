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