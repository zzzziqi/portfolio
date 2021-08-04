class TodoLists {
  constructor() {
    this.adding = document.querySelector(".adding");
    this.addingBtn = document.querySelector(".adding-icon");
    this.addingInput = document.querySelector(".adding input");
    this.uncompleted = document.querySelector(".todo-lists");
    this.todoListContainer = document.querySelector(".todo-list-container");
    this.completed = document.querySelector(".completed");
    this.completedContainer = document.querySelector(".completed-container");
    this.deleteListWarning = document.querySelector(".delete-list-warning");
    this.panelText = document.querySelector(".delete-list-warning .panel h6");
    this.cancelWarningBtn = document.querySelector(".cancel");
    this.confirmDelete = document.querySelector(".confirm-delete");
    this.deleteTodoList = null;
    this.prompt = document.querySelector(".prompt");
    this.timesup = document.querySelector(".timesup");
    this.inspiration = document.querySelector(".inspiration");
    this.inspirationText = "";
    this.data = JSON.parse(localStorage.getItem("todoLists"));
    this.newData = [];
    this.day = new Date();
    this.date = document.querySelector(".date");
    this.musicBtn = document.querySelector(".music");
  }
  setTheDay() {
    let whichDay = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let whichMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = this.day.getDate();
    switch (date % 10) {
      case 1:
        date = date + "st";
        break;
      case 2:
        date = date + "nd";
        break;
      case 3:
        date = date + "rd";
        break;
      default:
        date = date + "th";
        break;
    }
    let month = whichMonth[this.day.getMonth()];

    this.date.innerText =
      whichDay[this.day.getDay()] +
      ", " +
      date +
      " " +
      month +
      ", " +
      this.day.getFullYear();
  }
  storeData() {
    localStorage.setItem("todoLists", JSON.stringify(this.newData));
  }
  setDataToAnItem() {
    if (this.data.length !== 0) {
      this.newData = this.data;
      this.data.forEach((todoList) => {
        this.addingTodo(todoList.content, todoList.completed);
      });
    } else {
      this.data = [];
    }
  }
  removeItemFromLocalStorage(content) {
    this.newData.forEach((todolist, index) => {
      if (todolist.content === content) {
        this.newData.splice(index, 1);
      }
    });
  }
  addItemToLocalStorage(todoText) {
    let todoList = { content: todoText, completed: false };
    this.newData.push(todoList);
  }
  addingTodo(content, hasDone) {
    if (content) {
      this.producingTodo(content, hasDone);
      this.showTodoLists();
    } else {
      let todoText = this.adding.children[1].value.replace(/^\s*|\s*$/g, "");
      if (todoText) {
        this.producingTodo(todoText);
        this.adding.children[1].value = "";
        this.showTodoLists();
        this.addItemToLocalStorage(todoText);
      }
    }
  }

  producingTodo(content, hasDone) {
    //   create a list
    let li = document.createElement("li");
    // if the todoList's completed is true, then add the class name "completed"
    if (!hasDone) {
      li.classList.add("completed");
    }

    // adding a classname
    li.classList.add("todo-list");
    // create elements and apend the elements
    let tick = document.createElement("button");
    tick.classList.add("tick");
    tick.addEventListener("click", () => {
      this.changeList(li);
      this.playPrompt(li);
      redo.click();

      this.newData.forEach((todolist, index) => {
        if (li.classList.contains("completed")) {
          if (todolist.content === content) {
            this.newData[index].completed = true;
          }
        } else {
          if (todolist.content === content) {
            this.newData[index].completed = false;
          }
        }
      });
    });

    li.appendChild(tick);
    let p = document.createElement("p");
    p.addEventListener("click", () => {
      this.changeTodoListText(p, li);
    });
    li.appendChild(p);
    p.innerText = content;

    //   create countdown element

    let countdownContainer = document.createElement("div");
    countdownContainer.classList.add("countdown-container");
    document.addEventListener("click", (e) => {
      if (clock.classList.contains("display")) {
        clock.click();
      }
    });
    countdownContainer.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    let countdown = document.createElement("div");
    countdown.classList.add("countdown");
    let clockTimer = document.createElement("span");
    clockTimer.classList.add("clock-timer");
    let minutes = document.createElement("span");
    minutes.classList.add("minutes");
    minutes.innerText = "25";
    let comma = document.createElement("span");

    comma.innerText = " : ";
    let seconds = document.createElement("span");
    seconds.classList.add("seconds");
    seconds.innerText = "00";
    clockTimer.appendChild(minutes);
    clockTimer.appendChild(comma);
    clockTimer.appendChild(seconds);
    countdown.appendChild(clockTimer);

    let play = document.createElement("button");
    play.classList.add("play");
    play.innerHTML = '<i class="fas fa-play"></i>';

    countdown.appendChild(play);

    let redo = document.createElement("button");
    redo.classList.add("redo");
    redo.innerHTML = '<i class="fas fa-redo-alt"></i>';
    countdown.appendChild(redo);
    countdownContainer.appendChild(countdown);

    li.appendChild(countdownContainer);

    let clock = document.createElement("button");
    clock.classList.add("clock");
    clock.innerHTML = '<i class="fas fa-clock"></i>';
    clock.addEventListener("click", (e) => {
      e.stopPropagation();
      this.displayCountdown(countdown, clock);
    });
    li.appendChild(clock);

    let trash = document.createElement("button");
    trash.classList.add("trash");
    trash.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trash.addEventListener("click", () => {
      todoLists.displayDeleteWarning(li);
    });
    li.appendChild(trash);
    //   adding the functionality for the clock
    this.playAndResetCountdown(play, redo, minutes, seconds, clock);

    this.todoListContainer.insertAdjacentElement("afterbegin", li);

    // if the li contains completed classname, then change it to completed ul
    this.changeList(li);
  }
  playAndResetCountdown(play, redo, minutes, seconds, clock) {
    let timer = null;
    let timerBegin = false;
    let remainTime = 1500000;
    let i = 1;
    let remainMinutes = 25;
    let remainSeconds = 0;
    play.addEventListener("click", () => {
      if (!timerBegin) {
        clock.style = "color: #2948ff";
        play.innerHTML = '<i class="fas fa-pause"></i>';
        timerBegin = true;

        timer = setInterval(() => {
          remainTime = (25 * 60 * 1000 - 1000 * i) / 1000;
          remainSeconds = remainTime % 60;
          remainMinutes = Math.floor(remainTime / 60);

          remainSeconds =
            remainSeconds < 10 ? "0" + remainSeconds : "" + remainSeconds;

          remainMinutes =
            remainMinutes < 10 ? "0" + remainMinutes : "" + remainMinutes;
          i++;
          minutes.innerText = remainMinutes;
          seconds.innerText = remainSeconds;
          if (remainMinutes === "00" && remainSeconds === "00") {
            this.timesup.volume = 0.2;
            this.timesup.play();
            redo.click();
            return;
          }
        }, 1000);
      } else {
        clock.style = "color: #8d8d8d";
        play.innerHTML = '<i class="fas fa-play"></i>';
        timerBegin = false;
        clearInterval(timer);
        timer = null;
      }
    });

    redo.addEventListener("click", () => {
      clock.style = "color: #8d8d8d";

      clearInterval(timer);
      timer = null;
      timerBegin = false;
      remainTime = 1500000;
      i = 1;
      play.innerHTML = '<i class="fas fa-play"></i>';

      minutes.innerText = "25";
      seconds.innerText = "00";
    });
  }

  changeTodoListText(p, li) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("maxlength", "30");
    input.value = `${p.innerText}`;
    li.replaceChild(input, p);
    input.select();
    input.addEventListener("blur", () => {
      let newP = document.createElement("p");
      input.value = input.value.replace(/^\s*|\s*$/g, "");
      if (input.value !== "") {
        newP.innerText = input.value;
        this.newData.forEach((todoList) => {
          if (todoList.content === p.innerText) {
            todoList.content = input.value;
          }
        });
      } else {
        newP.innerText = p.innerText;
      }
      newP.addEventListener("click", () => {
        this.changeTodoListText(newP, li);
      });
      li.replaceChild(newP, input);
    });
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        input.blur();
      }
    });
  }
  displayCountdown(countdown, clock) {
    if (countdown.classList.contains("display")) {
      countdown.classList.remove("display");
      countdown.style = "transform: translateX(110%)";
      //   clock.style = "color: #8d8d8d";
      clock.classList.remove("display");
    } else {
      countdown.style = "transform:translateX(0)";
      countdown.classList.add("display");
      //   clock.style = "color: #2948ff";
      clock.classList.add("display");
    }
  }

  playPrompt(li) {
    if (li.classList.contains("completed")) {
      this.prompt.currentTime = 0;
      this.prompt.volume = 0.2;
      this.prompt.play();
    }
  }
  displayDeleteWarning(li) {
    this.deleteListWarning.style = "display:block";
    this.panelText.innerText = `"${li.children[1].innerText}" will be permanently deleted.`;
    this.deleteTodoList = li;
  }
  cancelDeleteWarning() {
    this.deleteListWarning.style = "display:none";
  }
  delete() {
    this.removeItemFromLocalStorage(this.deleteTodoList.children[1].innerText);
    this.deleteTodoList.remove();

    this.cancelDeleteWarning();
    this.showTodoLists();
    this.showCompletedLists();
  }
  showTodoLists() {
    if (this.todoListContainer.children.length === 0) {
      this.uncompleted.style = "display:none";
    } else {
      this.uncompleted.style = "display:block";
    }
  }
  showCompletedLists() {
    if (this.completedContainer.children.length === 0) {
      this.completed.style = "display:none";
    } else {
      this.completed.style = "display:block";
    }
  }
  changeList(li) {
    if (!li.classList.contains("completed")) {
      li.classList.add("completed");
      li.children[0].innerHTML = '<i class="fas fa-check-circle"></i>';
      this.completedContainer.insertAdjacentElement("afterbegin", li);
    } else {
      li.classList.remove("completed");
      li.children[0].innerHTML = "";
      this.todoListContainer.insertAdjacentElement("afterbegin", li);
    }
    this.showTodoLists();
    this.showCompletedLists();
  }
  getInspiration() {
    fetch("https://api.adviceslip.com/advice")
      .then((result) => result.json())
      .then((inspiration) => {
        this.inspirationText = inspiration.slip.advice;
        this.setInspiration();
      });
  }

  setInspiration() {
    this.inspiration.innerText = `"${this.inspirationText}"`;
  }

  scaleVideo() {
    let width = this.date.offsetWidth;
    let height = (width / 560) * 315;
    player.setSize((width = `${width}`), (height = `${height}`));
  }
}

let todoLists = new TodoLists();

todoLists.addingBtn.addEventListener("click", () => {
  todoLists.addingTodo();
});

todoLists.addingInput.addEventListener("keyup", (e) => {
  // if the user press enter, then they can add todo list as well
  if (e.keyCode === 13) {
    //   todoLists.addingTodo();
    todoLists.addingBtn.click();
  }
});

todoLists.cancelWarningBtn.addEventListener("click", () => {
  todoLists.cancelDeleteWarning();
});

todoLists.confirmDelete.addEventListener("click", () => {
  todoLists.delete();
});

todoLists.musicBtn.addEventListener("click", () => {
  let musicVideo = document.querySelector(".music-video");
  if (musicVideo.classList.contains("display")) {
    musicVideo.style = "display:none";
    musicVideo.classList.remove("display");
  } else {
    musicVideo.style = "display:block";
    musicVideo.classList.add("display");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  todoLists.getInspiration();
  todoLists.setDataToAnItem();
  todoLists.setTheDay();
});

window.addEventListener("beforeunload", () => {
  todoLists.storeData();
});

window.addEventListener("resize", () => {
  todoLists.scaleVideo();
});

// setting the youtube video
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    autoplay: 0,
    height: "360",
    width: "640",
    videoId: "5qap5aO4i9A",
    playerVars: {
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      color: "white",
      playsinline: "1",
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  todoLists.scaleVideo();
}

function onPlayerReady(event) {
  // event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    todoLists.musicBtn.classList.add("active");
  } else {
    todoLists.musicBtn.classList.remove("active");
  }
}
