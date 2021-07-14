const secondsLeft = 0;
let targetSec = 0;
let targetMin = 0;
let targetHrs = 0;
const timer = document.querySelector(".timer");
const arrowsUp = document.querySelectorAll(".up");
const arrowsDown = document.querySelectorAll(".down");
const inputs = document.querySelectorAll(".timeInput");
const timerBtn = document.getElementById("timerBtn");
let audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-show-suspense-waiting-667.mp3");
let pauseBtn = document.createElement("button");
        pauseBtn.className = "Btn";
        pauseBtn.innerText = "Pause Timer";

let value;
let timerStarted = false;
let intervalId;

let stopBtnPressed = false;
for(let index = 0; index < arrowsUp.length; index++) {
	arrowsUp[index].addEventListener('click', function(e) {
		value = inputs[index].value;
		if(value === "") {
			value = "01";
		} else {
			if(Number(value) >= 59) {
				value = "-1";
			}
			if(Number(value) < 9) {
				value = "0" + (Number(value) + 1);
			} else {
				value = Number(value) + 1;
			}
		}
		inputs[index].value = value;
		//console.log(value);
	})
	arrowsDown[index].addEventListener('click', function(e) {
		value = inputs[index].value;
		if(Number(value) > 10) {
			value = Number(value) - 1;
		} else if(Number(value) > 0) {
			value = "0" + (Number(value) - 1);
		} else {
			value = 59;
		}
		inputs[index].value = value;
		//console.log(value);
	});
};

function normalizeTime(value) {
	if(value < 10) {
		value = "0" + value;
	}
	return value;
}

function decrementTimer() {

	if(targetSec > 0) {
		targetSec--;
	} else {
		if(targetMin > 0) {
			targetSec = 60;
			targetMin--;
		} else {
			if(targetHrs > 0) {
				targetHrs--;
				targetMin = 60;
                decrementTimer();
			} else {
				
				audio.play();
				clearInterval(intervalId);
				timerStarted = false;
				timerBtn.parentNode.removeChild(pauseBtn);
				stopBtnPressed =false;
				timerBtn.innerHTML = "add timer";
				alert("Time's up!");
				audio.pause();
				audio.currentTime = 0;
			}
		}
	}
	timer.innerHTML = normalizeTime(targetHrs) + ":" + normalizeTime(targetMin) + ":" + normalizeTime(targetSec);
}
timerBtn.addEventListener('click', function(e) {
	
	if(timerStarted === false && stopBtnPressed===false) {
		for(let index = 0; index < inputs.length; index++) {
			switch(index) {
				case 0:
					targetHrs = Number(inputs[index].value);
					break;
				case 1:
					targetMin = Number(inputs[index].value);
					break;
				case 2:
					targetSec = Number(inputs[index].value);
					break;
			}
			inputs[index].value = "";
		}
		timerStarted = true;
		intervalId = setInterval(() => decrementTimer(), 1000);
        timerBtn.parentNode.appendChild(pauseBtn);
		timerBtn.innerText = "stop timer";
	} else { 
		
		timerBtn.innerText = "add timer";       
        timerStarted = false;
		clearInterval(intervalId);
		timerBtn.parentNode.removeChild(pauseBtn);
        timer.innerHTML = "00:00:00";
		stopBtnPressed =false;
	}
});
pauseBtn.addEventListener('click', function(e) {
if (timerStarted===false) {
	stopBtnPressed = false;
	timerStarted = true;
		intervalId = setInterval(() => decrementTimer(), 1000);
}
else{
	stopBtnPressed = true;
	timerStarted = false;
		clearInterval(intervalId);
}
});