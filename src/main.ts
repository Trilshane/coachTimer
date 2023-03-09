import "./style.scss";
import createElement from "./createElement";

const app: HTMLElement | null = document.querySelector("#app");

// Табы выбора секции
const tabZone = createElement({
  tag: "div",
  proops: [{ class: "tabZone" }],
  parent: app,
});

const btnStopwatchZone = createElement({
  tag: "button",
  content: "Секундомер",
  proops: [{ class: "tabsBtn btn active" }],
  parent: tabZone,
});

const btnTimerZone = createElement({
  tag: "button",
  content: "Таймер",
  proops: [{ class: "tabsBtn btn" }],
  parent: tabZone,
});

//Секция секундомера
const stopwatchZone = createElement({
  tag: "div",
  proops: [{ class: "stopwatchZone" }],
  parent: app,
});

const stopwatch = createElement({
  tag: "h1",
  content: "00:00:00",
  proops: [{ class: "stopwatch" }],
  parent: stopwatchZone,
});

const stopwatchButtonZone = createElement({
  tag: "div",
  proops: [{ class: "timerButtonZone" }],
  parent: stopwatchZone,
});

const btnStart = createElement({
  tag: "button",
  content: "начать соревнование",
  proops: [{ class: "startBtn btn" }],
  parent: stopwatchButtonZone,
});
const btnResult = createElement({
  tag: "button",
  content: "отметить результат",
  proops: [{ class: "resultBtn btn" }],
  parent: stopwatchButtonZone,
});
let stopwatchID: number = 0;

function startCompitition() {
  let min = 0;
  let sec = 0;
  let tertia = 0;
  stopwatchID = setInterval(() => {
    tertia++;
    if (tertia > 60) {
      sec++;
      tertia = 0;
    }
    if (sec > 60) {
      min++;
      sec = 0;
    }
    stopwatch.textContent =
      fixZeroHelper(min) +
      ":" +
      fixZeroHelper(sec) +
      ":" +
      fixZeroHelper(tertia);
  }, 16.6666);
}

btnStart.onclick = (event: MouseEvent) => {
  if (event.target?.textContent === "начать соревнование") {
    startCompitition();
    stopwatchButtonZone.style.justifyContent = "space-between";
    btnResult.style.display = "inline";
    event.target.textContent = "стоп";
  } else {
    clearInterval(stopwatchID);
    stopwatch.textContent = "00:00:00";
    event.target.textContent = "начать соревнование";
    stopwatchButtonZone.style.justifyContent = "center";
    btnResult.style.display = "none";
    athleteResults = [];
  }
};
let athleteResults: (string | null)[] = [];

btnResult.onclick = () => {
  athleteResults.push(stopwatch.textContent);
  createElement({
    tag: "h4",
    content: `Спортсмен ${
      athleteResults.length
    }  пришел со временем ${athleteResults.at(-1)}`,
    proops: [{ class: "result" }],
    parent: athleteZone,
  });
  if (athleteResults.length > 0) {
    btnResertResuts.style.display = "inline";
  }
};
const athleteZone = createElement({
  tag: "div",
  proops: [{ class: "athleteZone" }],
  parent: app,
});

const btnResertResuts = createElement({
  tag: "button",
  content: "очистить результаты",
  proops: [{ class: "btnResertResult btn" }],
  parent: app,
});

btnResertResuts.onclick = () => {
  athleteZone.replaceChildren();
  btnResertResuts.style.display = "none";
};

// Секция таймера

const timerZone = createElement({
  tag: "div",
  proops: [{ class: "timerZone" }],
  parent: app,
});

const timerInputButton = createElement({
  tag: "button",
  content: "введите время таймера",
  proops: [{ class: "timerInputButton btn" }],
  parent: timerZone,
});

let questionIime;

timerInputButton.onclick = () => {
  do {
    questionIime = prompt("Введите время в секундах");
    if (isNaN(questionIime)) {
      alert("Введите числовое значение!");
    }
  } while (isNaN(questionIime));

  if (questionIime) {
    startTimer(questionIime);
    timerInputButton.style.display = "none";
    timer.style.display = "block";
    resertTimerButton.style.display = "inline";
  }
};

let timerID = 0;
const audio = new Audio("./audio/audio.mp3");

const timer = createElement({
  tag: "h1",
  content: "00:00",
  proops: [{ class: "timer" }],
  parent: timerZone,
});
const startTimer = (questionIime) => {
  timerID = setInterval(() => {
    let sec = Math.floor(questionIime % 60);
    let min = Math.floor(questionIime / 60);
    questionIime--;
    if (questionIime === 0) {
      audio.play();
    }
    if (questionIime === -1) {
      clearInterval(timerID);
    }
    timer.textContent = fixZeroHelper(min) + ":" + fixZeroHelper(sec);
  }, 1000);
};
const resertTimerButton = createElement({
  tag: "button",
  content: "сбросить время",
  proops: [{ class: "resertTimerButton btn" }],
  parent: timerZone,
});
resertTimerButton.onclick = () => {
  clearInterval(timerID);
  timer.textContent = "00:00";
  timerInputButton.style.display = "inline";
  resertTimerButton.style.display = "none";
};

// фиксер числовых значений
function fixZeroHelper(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

//логика секций
const tabs = [btnStopwatchZone, btnTimerZone];
const tabsContent = [stopwatchZone, timerZone];

const hideTabContent = () => {
  tabsContent.forEach((el) => (el.style.display = "none"));
  tabs.forEach((el) => el.classList.remove("active"));
};
const showTabContent = (i = 0) => {
  tabsContent[i].style.display = "block";
  tabs[i].classList.add("active");
};
hideTabContent();
showTabContent();
tabZone.onclick = (event) => {
  if (event.target && event.target.classList.contains("tabsBtn")) {
    tabs.forEach((el, i) => {
      if (event.target === el) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
};
