let get = {
  Ex(which) {
    return (how) =>
      `${Math.round(Math.random() * how)} ${which} ${Math.round(
        Math.random() * how
      )}`;
  },
  RandomEx(radix) {
    let maybe = ["+", "-"],
      rand = maybe[Math.floor(Math.random() * 2)],
      res = this.Ex(rand)(Math.round(Math.random() * radix));
    return {
      ex: res,
      ans: eval(res).toFixed(0)
    };
  }
};
let corrects = 0,
  speed = [],
  avspeed = [],
  wrongs = 0,
  general = 0;
function init_() {
  hideModal();
  let seconds = 0;
  let start = setInterval(() => {
    seconds += 1;
  }, 1);
  let radix = 1000,
    el = document.getElementById("question"),
    cols = document.querySelectorAll(".row.keys > .col span"),
    example = get.RandomEx(radix),
    every = [
      parseInt(example.ans) + 10,
      example.ans,
      parseInt(example.ans) + Math.round(Math.random() * 100),
      example.ans - 5
    ];
  every = every.sort(() => 0.5 - Math.random());
  el.innerText = example.ex;
  for (let each in cols) {
    cols[each].innerText = every[each];
  }
  cols.forEach((th) => {
    th.onclick = function () {
      if (th.innerHTML == example.ans) {
        speed.push(seconds);
        avspeed.push(seconds);
        clearInterval(start);
        corrects += 1;
      } else {
        wrongs += 1;
      }
      avspeed.push(seconds);
      clearInterval(start);
      general += 1;

      if (general === 11) {
        let sp = speed.reduce((a, b) => a + b);
        let asp = avspeed.reduce((a, b) => a + b);
        let res = `${
          corrects >= 10
            ? `Woow all of your answers are true ${
                asp >= 20000
                  ? "but you spend " + sp + " ms. Your rank is 1"
                  : "and your speed also good. You spent " +
                    sp +
                    " ms. You rank is 1"
              }`
            : `${
                corrects < 10 && corrects >= 5
                  ? `Good job you got ${corrects} point from 11.  Don't worry it is not bad. You spent ${asp} ms and your average speed is ${sp} ms. Your rank is 2`
                  : `Oh no you got only ${corrects} point from 11.You spent ${asp} ms and your average speed was ${sp} ms. You should learn math again. Better luck next time`
              }`
        }`;
        showModal(res);
      } else {
        init_();
      }
    };
  });
}
init_();

function showModal(ctx) {
  let modal = document.getElementById("modal"),
    content = modal.querySelector("#modalContent");
  content.innerText = ctx;
  modal.style.display = "flex";
}

function hideModal() {
  document.getElementById("modal").style.display = "none";
}
document.querySelector("#replay").onclick = replay;

function replay() {
  window.location.reload();
}

document.querySelector("#quit").onclick = quit;

function quit() {
  window.close();
  alert("Your browser does not support closing");
}

// let result = `You gave us ${corrects} times true answer and ${wrongs} times wrong ${
//   corrects >= 3
//     ? `and your speed is ${
//         speed.reduce((a, b) => a + b) >= 500
//           ? "fast. Good Job! Are not you Einstein?"
//           : "medium. Good You are lucky ;)"
//       }`
//     : "and your speed is slow but don't it will get faster as you play. So play again :)"
// }`;
