let wrapBut = document.createElement("div");
wrapBut.setAttribute("style", "margin: 0 auto");
document.body.prepend(wrapBut);

let buttonStart = document.createElement("button");
buttonStart.setAttribute("id", "buttonStart");
buttonStart.textContent = "START";
buttonStart.setAttribute(
  "style",
  "margin-left:200px; padding: 10px; border: 2px solid #423b0d; width: 100px; height: 50px; background-color: #08a60e; color: #fff; font-size: 24px; border-radius: 5px;  box-shadow: 10px 10px 15px rgba(0,0,0,0.5);"
);
wrapBut.prepend(buttonStart);

const wrapper = document.getElementById("wrapper");
wrapper.parentElement.style.display = "block";
wrapper.style.display = "block";
wrapper.style.margin = "0 auto";
wrapper.style.marginTop = 50 + "px";
// ************************************VARIABLES CONSIST SIZES
wrapper.width = 900;
wrapper.height = 600;
let x = wrapper.width;
let y = wrapper.height;
let buttonWidth = x / 6;
let buttonHeight = y / 15;
let paddingX = x / 10;
let paddingY = y / 50;
let playgroundWidth = x - paddingX * 2;
let playgroundHeight = y - paddingY * 10;
let textStartBeginning = paddingX + buttonWidth / 2;
let textStopBeginning = x - paddingX - buttonWidth / 2;
let textScoreBeginning = x / 2;
console.log(textStopBeginning);
let buttonStartBeginning = paddingX;
let buttonStopBeginning = x - paddingX - buttonWidth;
let scoreBeginning = x / 2 - buttonWidth / 2;
// ****************************************************** VARs ***

let heightRock = 120;
let widthRock = 10;
let xRock1 = paddingX;
let xRock2 = x - paddingX - widthRock;
let yRock1 = paddingY * 6 + playgroundHeight / 2 - heightRock / 2;
let yRock2 = paddingY * 6 + playgroundHeight / 2 - heightRock / 2;
let centerBallY = y / 2;
let centerBallX = x / 2;
let radiusBall = 10;
let speedBallX = 2;
let speedBallY = 3;
let player1Score = 0;
let player2Score = 0;
let score = `${player1Score} : ${player2Score}`;
let whoWin = "";
let stateStart = "stop";
let begin = 3;
let changeScoreState1 = "no";
let changeScoreState2 = "no";

if (wrapper && wrapper.getContext("2d")) {
  let ctx = wrapper.getContext("2d");
  blank();
  requestAnimationFrame(animation);

  // ****************** CREATE CONSTRUCTOR BUTTON
  class Button {
    constructor(
      buttonStartBeginning,
      paddingY,
      buttonWidth,
      buttonHeight,
      textStartBeginning,
      scoreValue,
      color,
      textColor
    ) {
      this.buttonStartBeginning = buttonStartBeginning;
      this.paddingY = paddingY;
      this.buttonWidth = buttonWidth;
      this.buttonHeight = buttonHeight;
      this.textStartBeginning = textStartBeginning;
      this.scoreValue = scoreValue;
      this.color = color;
      this.textColor = textColor;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.buttonStartBeginning,
        this.paddingY,
        this.buttonWidth,
        this.buttonHeight
      );
      ctx.fill();
      ctx.font = " 24px Franklin Gothic Medium";
      ctx.fontWeight = "400";
      ctx.fillStyle = this.textColor;
      ctx.textAlign = "center";
      ctx.fillText(this.scoreValue, this.textStartBeginning, this.buttonHeight);
    }
  }
  // ************************ CREATE CONSTRUCTOR ROCKET***
  class Rocket {
    constructor(
      posX,
      posY,
      widthRock,
      heightRock,
      color,
      flag,
      timerId,
      speedRocket
    ) {
      this.posX = posX;
      this.posY = posY;
      this.widthRock = widthRock;
      this.heightRock = heightRock;
      this.color = color;
      this.flag = flag;
      this.timerId = timerId;
      this.speedRocket = speedRocket;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.posX, this.posY, this.widthRock, this.heightRock);
      ctx.fill();
    }
  }
  // ******************* CREATE SCORE
  const scoreTable = new Button(
    scoreBeginning,
    paddingY,
    buttonWidth,
    buttonHeight,
    textScoreBeginning,
    score,
    "grey",
    "lightblue"
  );

  var rocket1 = new Rocket(
    xRock1,
    yRock1,
    widthRock,
    heightRock,
    "#6763db",
    "stop",
    0,
    5
  );
  var rocket2 = new Rocket(
    xRock2,
    yRock2,
    widthRock,
    heightRock,
    "#f23333",
    "stop",
    0,
    5
  );

  // *********************************** COUNTDOWN ***
  function countdown() {
    //   =======================================RANDOM START ===

    if (Math.random() <= 0.25) {
      speedBallX = -speedBallX;
      speedBallY = -speedBallY;
    }
    if (0.25 < Math.random() < 0.5) {
      speedBallX = speedBallX;
      speedBallY = -speedBallY;
    }
    if (0.5 <= Math.random() <= 0.75) {
      speedBallX = -speedBallX;
      speedBallY = speedBallY;
    }
    if (0.75 < Math.random() <= 1) {
      speedBallX = speedBallX;
      speedBallY = speedBallY;
    }
    changeScoreState1 = "";
    changeScoreState2 = "";
    let timer;
    whoWin = begin;
    begin--;
    if (begin <= -1) {
      buttonStart.disabled = false;
      stateStart = "go";
      whoWin = "";
      clearTimeout(timer);
      return (begin = 3);
    } else {
      timer = setTimeout(countdown, 1000);
      buttonStart.disabled = true;
    }
  }
  // *********************************** CLICK BUTTON START & STOP ***
  buttonStart.addEventListener("click", startBallTick);

  function startBallTick() {
    buttonStart.removeEventListener("click", startBallTick);
    buttonStart.addEventListener("click", stopBallTick);
    buttonStart.textContent = "PAUSE";
    whoWin = "";
    begin = 3;
    speedBallX = 2;
    speedBallY = 3;
    timer = setTimeout(countdown, 10);
  }
  function stopBallTick() {
    buttonStart.removeEventListener("click", stopBallTick);
    buttonStart.addEventListener("click", startBallTick);
    buttonStart.textContent = "START";
    stateStart = "stop";
  }
  // ***************************************** CHANGE SCORE ******************
  function changeScore() {
    if (changeScoreState1 === "goal") {
      console.log(changeScoreState1);
      player1Score += 1;
      scoreTable.scoreValue = `${player1Score} : ${player2Score}`;
      console.log(scoreTable.scoreValue);
    }
    if (changeScoreState2 === "goal") {
      console.log(changeScoreState2);
      player2Score += 1;
      scoreTable.scoreValue = `${player1Score} : ${player2Score}`;
      console.log(scoreTable.scoreValue);
    }
  }
  // ***************************************** startAfterGoal **************
  function startAfterGoal() {
    centerBallY = y / 2;
    centerBallX = x / 2;
    speedBallX = 2;
    speedBallY = 3;
    countdown();
  }
  // ************************************************** KEYBORD CHECK FLAG ***
  document.addEventListener("keydown", function (e) {
    if (e.key === "Shift" && rocket1.flag === "stop") {
      rocket1.flag = "up";
      doRocketMove();
      console.log("up");
    }
    if (e.key === "Control" && rocket1.flag === "stop") {
      rocket1.flag = "down";
      doRocketMove();
      console.log("down");
    }
    if (e.key === "ArrowUp" && rocket2.flag === "stop") {
      rocket2.flag = "up";
      doRocketMove(rocket2);
    }
    if (e.key === "ArrowDown" && rocket2.flag === "stop") {
      rocket2.flag = "down";
      doRocketMove(rocket2);
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.key === "Shift" || e.key === "Control") {
      rocket1.flag = "stop";
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      rocket2.flag = "stop";
    }
  });
  //************************************ END GAME ***
  function endGame() {
    console.log("endGame");
    whoWin = "";
    player1Score = 0;
    player2Score = 0;
    scoreTable.scoreValue = `${player1Score} : ${player2Score}`;

    stopBallTick();
  }
  // ============ANIMATION FUNCTIONS==ANIMATION FUNCTIONS==ANIMATION FUNCTIONS =====================

  function whoWinner() {
    if (player1Score === 2 || player2Score === 2) {
      console.log("whoWinner");
      begin = 0;
      clearTimeout(timer);
      stateStart = "stop";
      speedBallX = 0;
      speedBallY = 0;
      setTimeout(endGame, 1500);
    }
  }
  function createBall() {
    ctx.beginPath();
    ctx.fillStyle = "#8a0e06";
    ctx.arc(centerBallX, centerBallY, radiusBall, 0, Math.PI * 2);
    ctx.fill();
  }
  function moveBall() {
    // ************************************************ left side TICK ROCKET ***
    if (stateStart === "go") {
      centerBallX += speedBallX;
      centerBallY += speedBallY;
      if (
        centerBallX < xRock1 + rocket1.widthRock + radiusBall &&
        centerBallY < rocket1.posY + heightRock &&
        centerBallY > rocket1.posY
      ) {
        speedBallX = -speedBallX;
      }
      // ************************************************ right side TICK ROCKET***
      if (
        centerBallX > xRock2 - radiusBall &&
        centerBallY < rocket2.posY + heightRock &&
        centerBallY > rocket2.posY
      ) {
        speedBallX = -speedBallX;
      }
      // ************************************************ TOP TICK***
      if (centerBallY < paddingY * 6 + radiusBall) {
        speedBallY = -speedBallY;
      }
      // ************************************************* DOWN TICK***
      if (centerBallY > paddingY * 6 + playgroundHeight - radiusBall) {
        speedBallY = -speedBallY;
      }
    }
    // ************************************************** SCORE +1 ***
    if (centerBallX < xRock1 + radiusBall) {
      changeScoreState2 = "goal";
      stateStart = "stop";
      changeScore();
      startAfterGoal();
    }
    if (centerBallX > xRock2 + widthRock - radiusBall) {
      changeScoreState1 = "goal";
      stateStart = "stop";
      changeScore();
      startAfterGoal();
    }
    if (player1Score === 2) {
      whoWin = "player 1 WIN";
      console.log("moveBall");
      buttonStart.disabled = false;
    }
    if (player2Score === 2) {
      whoWin = "player 2 WIN";
      buttonStart.disabled = false;
    }
  }
  function doRocketMove() {
    if (rocket1.flag === "up" && rocket1.posY > paddingY * 6) {
      rocket1.posY = rocket1.posY - rocket1.speedRocket;
    }
    if (rocket2.flag === "up" && rocket2.posY > paddingY * 6) {
      rocket2.posY = rocket2.posY - rocket2.speedRocket;
    }
    if (
      rocket1.flag === "down" &&
      rocket1.posY + rocket1.heightRock < playgroundHeight + paddingY * 6
    ) {
      rocket1.posY = rocket1.posY + rocket1.speedRocket;
    }
    if (
      rocket2.flag === "down" &&
      rocket2.posY + rocket2.heightRock < playgroundHeight + paddingY * 6
    ) {
      rocket2.posY = rocket2.posY + rocket2.speedRocket;
    }
    if (rocket1.flag === "stop") {
      speedRocket = 0;
    }
    if (rocket2.flag === "stop") {
      speedRocket = 0;
    }
  }
  function blank() {
    // ******************* CREATE COMMON WRAPPER FOR PLAYGROUND, BUTTONS, SCORE
    ctx.beginPath();
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, x, y);
    ctx.fill();
    // ******************* CREATE PLAYGROUND
    ctx.beginPath();
    ctx.fillStyle = "#fcca66";
    ctx.fillRect(paddingX, paddingY * 6, playgroundWidth, playgroundHeight);
    ctx.fill();
    // ******************* CREATE PLAYGROUND border
    ctx.beginPath();
    ctx.strokeStyle = "#8c8c8c";
    ctx.rect(paddingX, paddingY * 6, playgroundWidth, playgroundHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.font = " 52px Franklin Gothic Medium";
    ctx.fontWeight = "900";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText(whoWin, x / 2, y / 2 - 20);
  }
  // ************************************************* ANIMATION ***
  function animation() {
    blank();
    createBall();
    moveBall();
    rocket1.draw();
    rocket2.draw();
    scoreTable.draw();
    doRocketMove();
    // changeScore();
    whoWinner();
    // endGame();

    requestAnimationFrame(animation);
  }
}
