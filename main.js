var seconds = document.querySelector("#seconds");

var minutes = document.querySelector("#minutes");

var countdown = document.querySelector("#countdown");

var startbutton = document.querySelector("#startbutton");

var pausebutton = document.querySelector("#pause");

var stopbutton = document.querySelector("#stopbutton");

var formdiv = document.querySelector("#formdiv");

var catpic = document.querySelector("#catpic");

var spinner = document.querySelector(".lds-dual-ring");

startbutton.onclick = function () {
  var secondsleft = +seconds.value + +minutes.value * 60;
  var secondsdown = setInterval(function () {
    var sec = secondsleft % 60;
    sec = sec < 10 ? "0" + sec : sec;
    min = Math.floor(secondsleft / 60);
    countdown.innerText = min + ":" + sec;
    secondsleft--;
    if (secondsleft === -1) {
      clearInterval(secondsdown);
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
  };
  pausebutton.onclick = function () {
    clearInterval(secondsdown);
    seconds.value = secondsleft % 60;
    minutes.value = Math.floor(secondsleft / 60);
  };
};
