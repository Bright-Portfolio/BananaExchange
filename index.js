const accesskey = "badf0a31c03a4698ba131fc4b1b21bc1";
const formEle = document.querySelector("#exForm");
const baseCur = document.querySelector("#base-cur");
const targetCur = document.querySelector("#target-cur");
const targetAmount = document.querySelector("#target-amount");
const conBtn = document.querySelector("#con-btn");
const conResult = document.querySelector("#con-result");
const listOfSymbols = document.querySelector("#symbols-list");
const symbolsArray = [];
// console.dir(exForm);

const symbols = async () => {
  try {
    const symbolsRes = await fetch(
      `https://api.currencyfreaks.com/v2.0/historical-data-limits`
    );
    const symbolsData = await symbolsRes.json();
    const symbolsList = symbolsData.availabilityPeriod;

    for (const list in symbolsList) {
      const option = document.createElement("option");
      const year = symbolsList[list];
      if (year < "2013") {
        option.value = list;
        listOfSymbols.append(option);
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await symbols();
});

// console.log(symbols);

async function exRate() {
  try {
    const base = baseCur.value;
    const target = targetCur.value;
    const amount = targetAmount.value;

    const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${accesskey}&symbols=${target}`;
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[target];

    conResult.innerHTML = rate;
    return rate;
  } catch (error) {
    console.log("Error", error);
  }
}

console.log(exRate());

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  exRate();
});

const moneyConvert = () => {};
// moneyConvert();

// note:ลอง loop เอาสกุุลทั้งหมดที่ api นี้ support มาใส่ไว้ใน option
// หาวิธีว่าเราจะทำยังไงให้ การคำนวณสกุลตอบโจทย์ user มากที่สุดใน api แบบฟรีนี้
//ดึงสกุลแต่ลัตัวออกมาโดย filter หาข้อมูลที่ country code != global
//problems:
//ยังคงมีปัยหาเลือกการดึงข้อมูลอัตราแลกเปลี่ยนเนื่องจาก ยังหาวิธีเข้าถึงโดยที่ไม่ต้องมานั่งพิมสกุลเงินตัวสุดท้ายของตัวแปรแบบอัตโนมัติไม่ได้
