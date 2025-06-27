const accesskey = "badf0a31c03a4698ba131fc4b1b21bc1";
const formEle = document.querySelector("#exForm");
const baseCur = document.querySelector("#base-cur");
const targetCur = document.querySelector("#target-cur");
const inputAmount = document.querySelector("#amount");
const conBtn = document.querySelector("#con-btn");
const conResult = document.querySelector("#con-result");
// console.dir(exForm);

// fetch symbols data for slection
//this func is not finish yet the data not filter only the country code that is global.
const symbols = async () => {
  try {
    const symbolsRes = await fetch(
      `https://api.currencyfreaks.com/v2.0/supported-currencies`
    );
    const symbolsData = await symbolsRes.json();
    console.log(symbolsData);
  } catch (error) {
    console.log("Error", error);
  }
};
symbols();

async function exRate() {
  const base = baseCur.value;
  const target = targetCur.value;
  const amount = inputAmount.value;

  const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${accesskey}&symbols=${target}`;
  const res = await fetch(url);
  const data = await res.json();
  const rate = data.rates;
  console.log(rate);

  conResult.innerHTML = data.rates.EUR;
}

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  exRate();
});

// note:ลอง loop เอาสกุุลทั้งหมดที่ api นี้ support มาใส่ไว้ใน option
// หาวิธีว่าเราจะทำยังไงให้ การคำนวณสกุลตอบโจทย์ user มากที่สุดใน api แบบฟรีนี้
//ดึงสกุลแต่ลัตัวออกมาโดย filter หาข้อมูลที่ country code != global
//problems:
//ยังคงมีปัยหาเลือกการดึงข้อมูลอัตราแลกเปลี่ยนเนื่องจาก ยังหาวิธีเข้าถึงโดยที่ไม่ต้องมานั่งพิมสกุลเงินตัวสุดท้ายของตัวแปรแบบอัตโนมัติไม่ได้
