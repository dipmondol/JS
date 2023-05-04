const nextBtn = document.querySelector(".nextBtn");

const timeLine = document.querySelector(".time-lines");
const result_box = document.querySelector(".html-quiz-result-container");
const restart_quiz = document.querySelector(".reloadBtn");
const quit_quiz = document.querySelector(".quitBtn");

quit_quiz.onclick = () => {
  window.location.reload();
};
restart_quiz.onclick = () => {
  window.location.reload();
};

let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

showQuestions(0);
startTimer(timeValue);
startTimeLine(0);

function showQuestions(index) {
  const que_text = document.querySelector(".text");
  const option_list = document.querySelector(".quiz-options");
  const total_que = document.querySelector(".total-que");

  let option_tag =
    '<div class="options">' +
    sassQuestions[index].options[0] +
    "</div>" +
    ' <div class="options">' +
    sassQuestions[index].options[1] +
    "</div>" +
    '<div class="options">' +
    sassQuestions[index].options[2] +
    "</div>" +
    '<div class="options">' +
    sassQuestions[index].options[3] +
    "</div>";

  let que_tag =
    "<span>" +
    sassQuestions[index].num +
    "." +
    sassQuestions[index].question +
    "</span>";

  let total_queTag = "<p>" + sassQuestions[index].num + " of 5 Questions</p>";

  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  total_que.innerHTML = total_queTag;

  const option = option_list.querySelectorAll(".options");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
let tickIcon =
  '<div class="right-icon"><ion-icon name="checkmark-outline"></ion-icon></div>';
let crossIcon =
  '<div class="close-icon"><ion-icon name="close-outline"></ion-icon></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = sassQuestions[que_count].answer;
  const option_list = document.querySelector(".quiz-options");
  let allOptions = option_list.children.length;

  if (userAns === correctAns) {
    userScore += 1;
    console.log(userScore);

    answer.classList.add("correct");
    console.log("Answer Is correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    console.log("ans is wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "options  correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
    // startTimer(15);
  }

  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  if (que_count < sassQuestions.length - 1) {
    que_count++;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);

    clearInterval(counterLine);
    startTimeLine(widthValue);
    nextBtn.style.display = "none";
  } else {
    console.log("You have completed your task");
    showResultBox();
  }
};

function showResultBox() {
  const QuizBox = document.querySelector(".html-quiz-container");
  const Questions = document.querySelector(".quiz-options");

  result_box.classList.add("activeResult");

  const scoreText = document.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span>Congratulations You Got <p>" +
      userScore +
      "</p> Out Of <p>" +
      sassQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>Carry On You Got <p>" +
      userScore +
      "</p> Out Of <p>" +
      sassQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>Sorry You Got <p>" +
      userScore +
      "</p> Out Of <p>" +
      sassQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  const timeCount = document.querySelector(".seconds");
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time + "s";
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = 0 + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    }
  }
}

function startTimeLine(time) {
  counterLine = setInterval(timer, 50);
  function timer() {
    time += 2;
    timeLine.style.width = time + "px";
    if (time > 599) {
      clearInterval(counterLine);
    }
  }
}
