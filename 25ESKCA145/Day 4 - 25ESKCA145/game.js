let apple = 0;
let banana = 0;

function randomPosition(id){

    let game = document.getElementById("gameArea");

    let maxX = game.clientWidth - 100;
    let maxY = game.clientHeight - 100;

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    let fruit = document.getElementById(id);

    fruit.style.left = x + "px";
    fruit.style.top = y + "px";
}

randomPosition("apple");
randomPosition("banana");

function appleClick(){

    apple++;

    document.getElementById("appleScore").innerHTML = apple;

    randomPosition("apple");
    randomPosition("banana");

    if(apple==20){

        document.getElementById("winner").innerHTML =
        "🏆 Apple Wins!";

        document.getElementById("apple").style.display="none";
        document.getElementById("banana").style.display="none";
    }
}

function bananaClick(){

    banana++;

    document.getElementById("bananaScore").innerHTML = banana;

    randomPosition("apple");
    randomPosition("banana");

    if(banana==20){

        document.getElementById("winner").innerHTML =
        "🏆 Banana Wins!";

        document.getElementById("apple").style.display="none";
        document.getElementById("banana").style.display="none";
    }
}