/**
 * Created by forshah on 3/8/2015.
 */

window.onload = function() {
    var food = document.getElementById("food");
    var snake = document.getElementsByClassName("snake")[0];
    var gameArea = document.getElementById("gameArea");
    var score = document.getElementById("score");
    var moveFoodInterval = null;
    var moveSnakeInterval = null;
    var colorChangeInterval = null;
    var snakeSpeed = 200;
    var gameOver = false;
    var gridSize = 16;
    var previousMove = "right";

    init();

    function init() {
        document.onkeydown = moveSnake;
        displayFoodRandomly();
        moveSnakeInterval = setInterval(moveRight, snakeSpeed);
        $(snake).data("move", "right");
        $(snake).data("previousMove", "right");
        colorChangeInterval = setInterval(changedFoodColor, 500);
    }

    function changedFoodColor() {
        $(food).css("background-color", "#" + getRandomNum(0, 999));
        $(food).css("border-color", "#" + getRandomNum(0, 999));
    }

    function displayFoodRandomly() {
        /////****by default first display food on some random location
        changeFoodLocation();
        ////****start interval to display food
        moveFoodInterval = setInterval(changeFoodLocation, getRandomNum(4, 10) * 5000);
    }

    function changeFoodLocation() {
        var randomLeft = roundToNum(getRandomNum(0, 784), gridSize);
        var randomTop = roundToNum(getRandomNum(0, 784), gridSize);
        food.style.marginLeft = randomLeft + "px";
        food.style.marginTop = randomTop + "px";
    }

    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function roundToNum(num, roundTo) {
        var mod = num % roundTo;
        var roundRes;
        if(mod <= (roundTo / 2)) {
            roundRes = (num - mod);
        }
        else {
            roundRes = (num - mod) + roundTo;
        }
        return roundRes;
    }

    function moveSnake(e) {
        if(!gameOver) {
            e = e || window.event;

            if(e.keyCode == '38') {
                if(previousMove !== "up" && previousMove !== "down") {
                    clearInterval(moveSnakeInterval);
                    //$(snake).data("previousMove", $(snake).data("move"));
                    moveSnakeInterval = setInterval(moveUp, snakeSpeed);
                    //$(snake).data("move", "up");
                    previousMove = "up";
                }
            }
            else if(e.keyCode == '40') {
                if(previousMove !== "down" && previousMove !== "up") {
                    clearInterval(moveSnakeInterval);
                    //$(snake).data("previousMove", $(snake).data("move"));
                    moveSnakeInterval = setInterval(moveDown, snakeSpeed);
                    //$(snake).data("move", "down");
                    previousMove = "down";
                }
            }
            else if(e.keyCode == '37') {
                if(previousMove !== "left" && previousMove !== "right") {
                    clearInterval(moveSnakeInterval);
                    //$(snake).data("previousMove", $(snake).data("move"));
                    moveSnakeInterval = setInterval(moveLeft, snakeSpeed);
                    //$(snake).data("move", "left");
                    previousMove = "left";
                }
            }
            else if(e.keyCode == '39') {
                if(previousMove !== "right" && previousMove !== "left") {
                    clearInterval(moveSnakeInterval);
                    //$(snake).data("previousMove", $(snake).data("move"));
                    moveSnakeInterval = setInterval(moveRight, snakeSpeed);
                    //$(snake).data("move", "right");
                    previousMove = "right";
                }
            }
        }
    }

    function moveUp() {
        if((parseInt($(snake).css("margin-top")) - gridSize) >= 0) {
            $(snake).data("previousMove", $(snake).data("move"));
            $(snake).css("margin-top", (parseInt($(snake).css("margin-top")) - gridSize) + "px");
            $(snake).data("move", "up");
            moveNextSnakes(snake);
            isFoodFound();
        }
        else {
            gameOverFunc();
        }
    }

    function moveDown() {
        if((parseInt($(snake).css("margin-top")) + gridSize) <= 784) {
            $(snake).data("previousMove", $(snake).data("move"));
            $(snake).css("margin-top", (parseInt($(snake).css("margin-top")) + gridSize) + "px");
            $(snake).data("move", "down");
            moveNextSnakes(snake);
            isFoodFound();
        }
        else {
            gameOverFunc();
        }
    }

    function moveLeft() {
        if((parseInt($(snake).css("margin-left")) - gridSize) >= 0) {
            $(snake).data("previousMove", $(snake).data("move"));
            $(snake).css("margin-left", (parseInt($(snake).css("margin-left")) - gridSize) + "px");
            $(snake).data("move", "left");
            moveNextSnakes(snake);
            isFoodFound();
        }
        else {
            gameOverFunc();
        }
    }

    function moveRight() {
        if((parseInt($(snake).css("margin-left")) + gridSize) <= 784) {
            $(snake).data("previousMove", $(snake).data("move"));
            $(snake).css("margin-left", (parseInt($(snake).css("margin-left")) + gridSize) + "px");
            $(snake).data("move", "right");
            moveNextSnakes(snake);
            isFoodFound();
        }
        else {
            gameOverFunc();
        }
    }

    function moveNextSnakes(currSnake) {
        var nextSnake = $(currSnake).next(".snake");
        var move;
        if(nextSnake.length > 0) {
            nextSnake = nextSnake[0];
            move = $(currSnake).data("previousMove");
            $(currSnake).data("previousMove", $(currSnake).data("move"));
            $(nextSnake).data("previousMove", $(nextSnake).data("move"));
            if(move === "up") {
                up(nextSnake);
                $(nextSnake).data("move", "up");
            }
            else if(move === "down") {
                down(nextSnake);
                $(nextSnake).data("move", "down");
            }
            else if(move === "left") {
                left(nextSnake);
                $(nextSnake).data("move", "left");
            }
            else if(move === "right") {
                right(nextSnake);
                $(nextSnake).data("move", "right");
            }
            moveNextSnakes(nextSnake);
        }
    }

    function up(currSnake) {
        $(currSnake).css("margin-top", (parseInt($(currSnake).css("margin-top")) - gridSize) + "px");
    }

    function down(currSnake) {
        $(currSnake).css("margin-top", (parseInt($(currSnake).css("margin-top")) + gridSize) + "px");
    }

    function left(currSnake) {
        $(currSnake).css("margin-left", (parseInt($(currSnake).css("margin-left")) - gridSize) + "px");
    }

    function right(currSnake) {
        $(currSnake).css("margin-left", (parseInt($(currSnake).css("margin-left")) + gridSize) + "px");
    }
    function gameOverFunc(){
        clearInterval(moveSnakeInterval);
        clearInterval(moveFoodInterval);
        clearInterval(colorChangeInterval);
        alert("Game Over!");
    }

    function isFoodFound() {
        var snakes=$(".snake")
        for(var i=1;i<snakes.length;i++){
            if((parseInt($(snake).css("margin-top")) === parseInt($(snakes[i]).css("margin-top"))) &&
                parseInt($(snake).css("margin-left")) === parseInt($(snakes[i]).css("margin-left"))) {
                gameOverFunc();
                return false;
            }
        }
        if((parseInt($(snake).css("margin-top")) === parseInt($(food).css("margin-top"))) &&
            parseInt($(snake).css("margin-left")) === parseInt($(food).css("margin-left"))) {
            //alert("Food Found!");
            changeFoodLocation();
            $(score).html(parseInt($(score).html()) + 1);
            var lastSanke = $($(".snake")[$(".snake").length - 1]);
            var newSnake = lastSanke.clone();
            var move = $(lastSanke).data("move")
            if(move === "up") {
                down(newSnake);
            }
            else if(move === "down") {
                up(newSnake);
            }
            else if(move === "left") {
                right(newSnake);
            }
            else if(move === "right") {
                left(newSnake);
            }
            newSnake.insertAfter(lastSanke);
        }
        //console.log($(snake).css("margin-top"), $(food).css("margin-top"), $(snake).css("margin-left"), $(food).css("margin-left"));

    }
}
