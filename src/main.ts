import "./style.scss";
import createElement from "./createElement";

const app: HTMLElement | null = document.querySelector("#app");

// Табы выбора секции
const tabZone: HTMLElement = createElement({
    tag: "div",
    props: [{class: "tabZone"}],
    parent: app,
});

const btnStopwatchZone = createElement({
    tag: "button",
    content: "Секундомер",
    props: [{class: "tabsBtn btn active"}],
    parent: tabZone,
});

const btnTimerZone = createElement({
    tag: "button",
    content: "Таймер",
    props: [{class: "tabsBtn btn"}],
    parent: tabZone,
});

//Секция секундомера
const stopwatchZone = createElement({
    tag: "div",
    props: [{class: "stopwatchZone"}],
    parent: app,
});

const stopwatch = createElement({
    tag: "h1",
    content: "00:00:00",
    props: [{class: "stopwatch"}],
    parent: stopwatchZone,
});

const stopwatchButtonZone = createElement({
    tag: "div",
    props: [{class: "timerButtonZone"}],
    parent: stopwatchZone,
});

const btnStart: HTMLElement = createElement({
    tag: "button",
    content: "начать соревнование",
    props: [{class: "startBtn btn"}],
    parent: stopwatchButtonZone,
});
const btnResult = createElement({
    tag: "button",
    content: "отметить результат",
    props: [{class: "resultBtn btn"}],
    parent: stopwatchButtonZone,
});
let stopwatchID: number = 0;

function startCompitition() {
    let min = 0;
    let sec = 0;
    let third = 0;
    stopwatchID = setInterval(() => {
        third++;
        if (third > 60) {
            sec++;
            third = 0;
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
            fixZeroHelper(third);
        // здесь лучше использовать https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals
    }, 16.6666);
}

btnStart.onclick = (event: MouseEvent) => {
    const el: HTMLElement = <HTMLElement>event.target;
    if (el?.textContent === "начать соревнование") {
        startCompitition();
        stopwatchButtonZone.style.justifyContent = "space-between";
        btnResult.style.display = "inline";
        el.textContent = "стоп";
    } else {
        clearInterval(stopwatchID);
        stopwatch.textContent = "00:00:00";
        el.textContent = "начать соревнование";
        stopwatchButtonZone.style.justifyContent = "center";
        btnResult.style.display = "none";
        athleteResults = [];
    }
};
let athleteResults: Array<string> = [];

btnResult.onclick = () => {
    if (stopwatch.textContent)
        athleteResults.push(stopwatch.textContent);
    createElement({
        tag: "h4",
        content: `Спортсмен ${
            athleteResults.length
        }  пришел со временем ${athleteResults.at(-1)}`,
        props: [{class: "result"}],
        parent: athleteZone,
    });
    if (athleteResults.length > 0) {
        btnResertResuts.style.display = "inline";
    }
};
const athleteZone = createElement({
    tag: "div",
    props: [{class: "athleteZone"}],
    parent: app,
});

const btnResertResuts = createElement({
    tag: "button",
    content: "очистить результаты",
    props: [{class: "btnResertResult btn"}],
    parent: app,
});

btnResertResuts.onclick = () => {
    athleteZone.replaceChildren();
    btnResertResuts.style.display = "none";
};

// Секция таймера

const timerZone = createElement({
    tag: "div",
    props: [{class: "timerZone"}],
    parent: app,
});

const timerInputButton = createElement({
    tag: "button",
    content: "введите время таймера",
    props: [{class: "timerInputButton btn"}],
    parent: timerZone,
});

let questionIime: string | null = '';

timerInputButton.onclick = () => {
    do {
        questionIime = prompt("Введите время в секундах");
        if (questionIime)
            if (isNaN(Number(questionIime))) {
                alert("Введите числовое значение!");
            }
    } while (isNaN(Number(questionIime)));

    if (questionIime) {
        startTimer(Number(questionIime));
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
    props: [{class: "timer"}],
    parent: timerZone,
});
const startTimer = (questionIime: number) => {
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
    props: [{class: "resertTimerButton btn"}],
    parent: timerZone,
});

resertTimerButton.onclick = () => {
    clearInterval(timerID);
    timer.textContent = "00:00";
    timerInputButton.style.display = "inline";
    resertTimerButton.style.display = "none";
};

// фиксер числовых значений
function fixZeroHelper(num: number): string {
    if (num < 10) {
        return "0" + num;
    }
    return String(num);
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
    const el: HTMLElement = <HTMLElement>event.target;
    if (el && el.classList.contains("tabsBtn")) {
        tabs.forEach((el, i) => {
            if (el === el) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
};
