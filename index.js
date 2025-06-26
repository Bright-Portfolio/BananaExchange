const accesskey = "badf0a31c03a4698ba131fc4b1b21bc1";
const formEle = document.querySelector("#exForm");
const baseCur = document.querySelector("#base-cur");
const targetCur = document.querySelector("#target-cur");
const inputAmount = document.querySelector("#amount");
const conBtn = document.querySelector("#con-btn");
// console.dir(exForm);

async function exRate() {
  const base = baseCur.value;
  const target = targetCur.value;
  const amount = inputAmount.value;

  const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${accesskey}&symbols=${target}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.rates);
}

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  exRate();
});

// note:ลอง loop เอาสกุุลทั้งหมดที่ api นี้ support มาใส่ไว้ใน option 
// หาวิธีว่าเราจะทำยังไงให้ การคำนวณสกุลตอบโจทย์ user มากที่สุดใน api แบบฟรีนี้