const accesskey = "badf0a31c03a4698ba131fc4b1b21bc1";
const formEle = document.querySelector("#exForm");
const baseCur = document.querySelector("#base-cur");
const targetCur = document.querySelector("#target-cur");
const amountInput = document.querySelector(".amount-input");
const amountDis = document.querySelector(".amount-display");
const conBtn = document.querySelector("#con-btn");
const conResult = document.querySelector("#con-result");
const listOfSymbols = document.querySelector("#symbols-list");
const symbolsArray = [];
// console.dir(amountInput);
amountDis.innerHTML = "abc"

const symbols = async () => {
  try {
    const symbolsRes = await fetch(
      `https://api.currencyfreaks.com/v2.0/supported-currencies`
    );
    const symbolsData = await symbolsRes.json();
    const symbolsList = symbolsData.supportedCurrenciesMap;

    for (const list in symbolsList) {
      const option = document.createElement("option");
      const currencyName = symbolsList[list].currencyName;
      const countryName = symbolsList[list].countryName;

      if (countryName !== "Global") {
        option.value = list;
        option.innerHTML = currencyName;
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
    const amount = amountInput.value;

    const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${accesskey}&symbols=${target}`;
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[target];
    const convertedAmount = rate * amount;
    console.log(convertedAmount);

    amountDis.innerHTML = convertedAmount;
  } catch (error) {
    console.log("Error", error);
  }
}

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  exRate();
});

const moneyConvert = () => {};
// moneyConvert();

// note:ลอง loop เอาสกุุลทั้งหมดที่ api นี้ support มาใส่ไว้ใน option --> done not sure is it the best solutoin?
//*due to a free api the base currency cannot change so it will always compare with USD need to figure it out how to change it */
//
//ดึงสกุลแต่ลัตัวออกมาโดย filter หาข้อมูลที่ country code != global
//problems:
//problem is: I've change class name to amount due to one to do class toggle between amount-input so the func can not find the amount value.
//**to do list*
//need to change dropdown list data from symbol to currency name.
//need to make input can swap from input to display like google do --> i will create 2 class name amount-input and amount-display i will tell JS that the input that being active it will toggle amount-input and the one not active is amount-display
//make dropdown work when click only(user can click anywhere in dropdown area)
