let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from localStorage

let h2 = document.querySelector("h2");

// Create and display high score in HTML
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `High Score: ${highScore}`;
document.body.insertBefore(highScoreDisplay, document.body.children[2]); // Insert below <h2>

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length); // Fix index range
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

// function checkAns(idx) {
//     if (userSeq[idx] == gameSeq[idx]) {
//         if (userSeq.length == gameSeq.length) {
//             setTimeout(levelUp, 1000);
//         }
//     } else {
//         updateHighScore(); // Update high score when game ends
//         h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to restart.`;
//         document.querySelector("body").style.backgroundColor = "red";
//         setTimeout(function () {
//             document.querySelector("body").style.backgroundColor = "white";
//         }, 150);

//         reset();
//     }
// }
function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore();

        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to restart.`;
        
        document.body.classList.add("game-over");
        setTimeout(() => document.body.classList.remove("game-over"), 500);

        reset();
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

// Function to update high score
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
}

// Function to reset game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
