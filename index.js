const accesskey = "badf0a31c03a4698ba131fc4b1b21bc1";
const formEle = document.querySelector("#exForm");
const baseCur = document.querySelector("#base-cur");
const targetCur = document.querySelector("#target-cur");
const targetAmount = document.querySelector("#target-amount");
const conBtn = document.querySelector("#con-btn");
const conResult = document.querySelector("#con-result");
const symbolsArray = [];
// console.dir(exForm);

// fetch symbols data for slection
//need to make symbols() run before DOM completely load
//filter currency that is not crypto from year < 2013
const symbols = async () => {
  try {
    const symbolsRes = await fetch(
      `https://api.currencyfreaks.com/v2.0/historical-data-limits`
    );
    const symbolsData = await symbolsRes.json();
    const symbolsList = symbolsData.availabilityPeriod;

    for (const list in symbolsList) {
      const year = symbolsList[list];
      if (year < "2013") {
        symbolsArray.push(list);
        
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  symbols();
});
console.log(symbolsArray);


async function exRate() {
  const base = baseCur.value;
  const target = targetCur.value;
  const amount = targetAmount.value;

  const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${accesskey}&symbols=${target}`;
  const res = await fetch(url);
  const data = await res.json();
  const rate = data.rates[target];

  conResult.innerHTML = rate;
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
