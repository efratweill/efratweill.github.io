var seconds = document.querySelector("#seconds");

var minutes = document.querySelector("#minutes");

var countdown = document.querySelector("#countdown");

var startbutton = document.querySelector("#startbutton");

var pausebutton = document.querySelector("#pause");

var stopbutton = document.querySelector("#stopbutton");

var formdiv = document.querySelector("#formdiv");

startbutton.onclick = function () {
  var secondsleft = +seconds.value + +minutes.value * 60;
  var secondsdown = setInterval(function () {
    var sec = secondsleft % 60;
    sec = sec < 10 ? "0" + sec : sec;
    min = Math.floor(secondsleft / 60);
    countdown.innerText = min + ":" + sec;
    secondsleft--;
    if (secondsleft === 0) {
      clearInterval(secondsdown);
      formdiv.innerHTML = '<div class="lds-dual-ring"></div>';
      fetch("https://aws.random.cat/meow")
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          var cat = json.file;
          formdiv.innerHTML = "<img src=" + json.file + ">";
        });
      /*async function main() {
        var res = await fetch("https://aws.random.cat/meow");
        var json = await res.json();
        var cat = json.file;
        formdiv.innerHTML = "<img src=" + json.file + ">";
      }*/
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
