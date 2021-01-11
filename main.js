var seconds = document.querySelector("#seconds");

var minutes = document.querySelector("#minutes");

var countdown = document.querySelector("#countdown");

var startbutton = document.querySelector("#startbutton");

var pausebutton = document.querySelector("#pause");

var stopbutton = document.querySelector("#stopbutton");

var formdiv = document.querySelector("#formdiv");

var catpic = document.querySelector("#catpic");

var spinner = document.querySelector(".lds-dual-ring");
var secInput,
  minInput = 0;
function shoeInput() {
  secInput = seconds.value;
  minInput = minutes.value;
  minInput = minInput === "" ? "0" : minInput;
  secInput = secInput === "" ? "0" + secInput : secInput;
  secInput = secInput < 10 ? "0" + secInput : secInput;
  countdown.innerText = minInput + ":" + secInput;
}

seconds.oninput = function () {
  shoeInput();
};

minutes.oninput = function () {
  shoeInput();
};

startbutton.onclick = function () {
  var secondsleft = +seconds.value + +minutes.value * 60;
  minutes.disabled = true; //blocks the input field
  seconds.disabled = true; //blocks the input field
  var secondsdown = setInterval(function () {
    var sec = secondsleft % 60;
    sec = sec < 10 ? "0" + sec : sec;
    min = Math.floor(secondsleft / 60);
    countdown.innerText = min + ":" + sec;
    secondsleft--;
    if (secondsleft === -1) {
      clearInterval(secondsdown);
      minutes.disabled = false;
      seconds.disabled = false;
      spinner.style.display = "inline-block";
      fetch("https://aws.random.cat/meow")
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          spinner.style.display = "none";
          catpic.src = json.file;
        });
    }
  }, 1000);

  stopbutton.onclick = function () {
    clearInterval(secondsdown);
    minutes.disabled = false;
    seconds.disabled = false;
    countdown.innerText = "00:00";
  };
  pausebutton.onclick = function () {
    clearInterval(secondsdown);
    seconds.value = secondsleft % 60;
    minutes.value = Math.floor(secondsleft / 60);
  };
};
