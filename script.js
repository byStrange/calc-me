let get = {
  Ex(which) {
    return (how) =>
      `${Math.round(Math.random() * how)} ${which} ${Math.round(
        Math.random() * how
      )}`;
  },
  RandomEx(radix) {
    let maybe = ["+", "-", "*", "/"],
      rand = maybe[Math.floor(Math.random() * 4)],
      res = this.Ex(rand)(Math.round(Math.random() * radix));
    return {
      ex: res,
      ans: eval(res).toFixed(0)
    };
  }
};
let corrects = 0,
  speed = [],
  wrongs = 0,
  general = 0;
function init_() {
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
        clearInterval(start);
        corrects += 1;
      } else {
        wrongs += 1;
      }
      general += 1;
      if (general == 10) {
        alert(
          `You gave us ${corrects} times true answer and ${wrongs} times wrong ${
            corrects >= 3
              ? `and your speed is ${
                  speed.reduce((a, b) => a + b) >= 500
                    ? "fast. Good Job! Are not you Einstein?"
                    : "medium. Good You are lucky ;)"
                }`
              : "and your speed is slow but don't it will get faster as you play. So play again :)"
          }`
        );
        window.location.reload();
      } else init_();
    };
  });
}
init_();
