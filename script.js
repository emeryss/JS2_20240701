// random 숫자를 만든다 => randNum = Math.random()
// 입력한 숫자를 받아서 비교한다 => inputNum vs randNum
// 결과를 알려준다 (up or down) => resultArea



let randNum
let instructionsArea = document.getElementById("instructions-Area")
let attemptArea = document.getElementById("attempt-Area")
let historyBox0 = document.getElementById("history-Box0")
let historyBox1 = document.getElementById("history-Box1")
let historyBox2 = document.getElementById("history-Box2")
let historyMobileArea = document.getElementById("history-mobile")
let resultsArea= document.getElementById("results-Area")
let inputNum = document.getElementById("input-Area")
let inputButton = document.getElementById("input-Button")
let showAnswerButton = document.getElementById("answer-Button")
let resetButton = document.getElementById("reset-Button")
let displayArea = document.getElementById("display-Area")


let attempts = 3
let answerLock = 1
let history = ["","",""];

inputNum.addEventListener("focus",function(){inputNum.value=""})
inputButton.addEventListener("click", guess)
showAnswerButton.addEventListener("mouseover", (event)=>showAnswer(1,answerLock))
showAnswerButton.addEventListener("mouseout", (event)=>showAnswer(0,answerLock))
showAnswerButton.addEventListener("click", (event)=>showAnswer(0,0))
resetButton.addEventListener("click", reset)

reset()

function guess(){
    guessNum = inputNum.value
    if(isNaN(guessNum) || guessNum<1 || guessNum>10){
        resultsArea.innerHTML = `"${guessNum}"은 잘못된 입력입니다. 1부터 100까지 숫자를 입력하세요`
        return
    }
    if(history.includes(guessNum)){
        resultsArea.innerHTML = `${guessNum}은 이미 시도했습니다. 다른 숫자를 입력하세요`
        return
    }

    if(guessNum<randNum){
        resultsArea.innerHTML = `${guessNum}보다 큰 숫자`
        displayArea.innerHTML = `<img class="img-fluid" src="./img/Up.gif" alt=""></img>`
    }else if(guessNum>randNum){
        resultsArea.innerHTML = `${guessNum}보다 작은 숫자`
        displayArea.innerHTML = `<img class="img-fluid" src="./img/Down.gif" alt=""></img>`
    }else if(guessNum==randNum){
        resultsArea.innerHTML = `${guessNum} 정답!!`
        displayArea.innerHTML = `<img class="img-fluid" src="./img/GG.png" alt=""></img>`
        disableGuess()
    }

    history[3-attempts] = guessNum
    console.log("history", history)

    let historyArray = [historyBox0, historyBox1, historyBox2]
    let historyMobileArray = historyArray
    historyMobileArea.innerHTML = ``
    for(i=0; i<3; i++){
        if(history[i]==""){break}
        historyArray[i].innerHTML = history[i]
        
        historyMobileArea.innerHTML += `${history[i]}&nbsp&nbsp`
        
    }

    attempts--;
    console.log("Attempts", attempts)
    attemptArea.innerHTML = `남은 기회: ${attempts}`
    if(attempts == 0 && guessNum != randNum){
        attemptArea.innerHTML = `남은 기회: ${attempts}`
        resultsArea.innerHTML = `틀렸습니다! ${randNum}가 정답이었습니다.`
        displayArea.innerHTML = `<img class="img-fluid" src="./img/Sad.gif" alt=""></img>`
        inputButton.disabled = true
    }
}

function showAnswer(state, locked){
    if(state==0 && locked==1){
        showAnswerButton.innerHTML = `Answer`
    }
    if(state==1 && locked==1){
        showAnswerButton.innerHTML = `Answer: ${randNum}`
    }
    
    if (locked==0){
        answerLock = -answerLock
        showAnswerButton.innerHTML = `Answer: ${randNum}`
    }

}

function disableGuess(){
    inputButton.disabled = true
}

function reset(){
    randNum = Math.floor(Math.random() * 10 + 1)
    console.log("Game Reset. Answer:", randNum)
    attempts = 3
    attemptArea.innerHTML = `남은 기회: ${attempts}`
    inputButton.disabled = false
    history = ["","",""]
    historyBox0.innerHTML = `<img class="img-fluid" src="./img/Start.gif" alt="">`
    historyBox1.innerHTML = `<img class="img-fluid" src="./img/Start.gif" alt="">`
    historyBox2.innerHTML = `<img class="img-fluid" src="./img/Start.gif" alt="">`
    historyMobileArea.innerHTML = `반응형 자리`
    if (answerLock == -1) {showAnswerButton.innerHTML = `Answer: ${randNum}`}
    displayArea.innerHTML = `<img class="img-fluid" src="./img/Go.gif" alt=""></img>`
}