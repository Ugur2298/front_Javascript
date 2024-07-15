const calculateBtn = document.getElementById("calculateBtn")
let analyzeBtn = document.getElementById("analyzeBtn")
const numberOfDay = document.getElementById("numberOfDay")
const quantity = document.getElementById("quantity")
const typeOfExpense = document.getElementById("typeOfExpense")
const cards = document.getElementById("cards")
const analyze = document.getElementById("analyze")



let generalExpense =
{
  qida: Array(7).fill(0),
  neqliyyat: Array(7).fill(0),
  tehsil: Array(7).fill(0),
  kommunikasiya: Array(7).fill(0),
  geyim: Array(7).fill(0),
  diger: Array(7).fill(0)
}

calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let valueOfDay = numberOfDay.value;
  let valueOfQuantity = quantity.value;
  let valueOfExpense = typeOfExpense.value;
  if (valueOfDay == "" || valueOfQuantity == "" || valueOfExpense == "") {
    alert("Deyerleri duzgun daxil edin")
    return;
  }

  generalExpense[valueOfExpense.toLowerCase()][valueOfDay - 1] += parseInt(valueOfQuantity);
  let item = document.getElementById(valueOfExpense.toLowerCase())
  if (!item) {
    const card = document.createElement("div")
    card.style.width = "18rem";
    card.className = "card"
    card.id = valueOfExpense.toLowerCase();
    card.innerHTML =
      `
           <img src="./random.jfif" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${valueOfExpense}</h5>
           
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${valueOfDay} gunun xerci ${valueOfQuantity} AZN</li>
             
            </ul>
           
          `

    cards.append(card);


  }
  else {
    item.querySelector("ul").innerHTML +=
      `
             <li class="list-group-item">${valueOfDay} gunun xerci ${valueOfQuantity} AZN</li>
            
             `
  }

})

analyzeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let summaryOfExpense = 0;
  let maxEpenseOfProduct = generalExpense[Object.keys(generalExpense)[0]].reduce((a, b) => a + b, 0);
  let typeMaxEpense = Object.keys(generalExpense)[0];
  let minimumExpenseOfProduct = generalExpense[Object.keys(generalExpense)[0]].reduce((a, b) => a + b, 0);
  let typeMinEpense = Object.keys(generalExpense)[0];
  let minimumDay=1;
  let minimumDayExpense =0;
  let maxDay = 1;
  let maxDayExpense = 0;

  let sumNthDay = 0

  for (const [key, values] of Object.entries(generalExpense)) {
    minimumDayExpense += generalExpense[key][0]
    maxDayExpense +=generalExpense[key][0]
  }
  for (let i = 1; i <= 7; i++) {
    for (const [key, values] of Object.entries(generalExpense)) {
      sumNthDay += generalExpense[key][i-1]
    }
    if (maxDayExpense < sumNthDay) {
      maxDayExpense = sumNthDay;
      maxDay = i;
     
    }
    if (minimumDayExpense > sumNthDay) {
      minimumDayExpense = sumNthDay;
      minimumDay = i;
     
    }
    sumNthDay = 0
  }
  analyze.innerHTML =
    `
        <table class="table">
  <thead>
    <tr>
      <th scope="col">WeekDay NO</th>
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Monday</th>
    </tr>
    <tr>
      <th>Tuesday</th>
    </tr>
    <tr>
      <th>Wednesday</th>
    </tr>
    <tr>
      <th>Thursday</th>
    </tr>
    <tr>
      <th>Friday</th>
    </tr>
    <tr>
      <th>Saturday</th>
    </tr>
    <tr>
      <th>Sunday</th>
    </tr>
  </tbody>
</table>
    `
  const tHead = document.querySelector("thead>tr")

  for (const [key, values] of Object.entries(generalExpense)) {
    let day = 1;
    if (maxEpenseOfProduct < values.reduce((a, b) => a + b, 0)) {
      maxEpenseOfProduct = values.reduce((a, b) => a + b, 0)
      typeMaxEpense = key;
    }

    if (minimumExpenseOfProduct > values.reduce((a, b) => a + b, 0)) {
      minimumExpenseOfProduct = values.reduce((a, b) => a + b, 0)
      typeMinEpense = key;
    }
    tHead.innerHTML +=
      `
       <th scope="col">${key}</th>
       
       `
    values.forEach(value => {
      document.querySelector(`tbody>tr:nth-child(${day})`).innerHTML += `<td>${value} AZN</td>`
      day++;
      summaryOfExpense += value;
    });
  }

  analyze.innerHTML +=
    `
      <div class="card" style="width: 100%;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Hefte erzinde toplam xerc: ${summaryOfExpense} AZN</li>
            <li class="list-group-item">En çox hansı növ üçün xerc çekilib və miqdarı ${typeMaxEpense.toUpperCase()}, ${maxEpenseOfProduct}  AZN</li>
            <li class="list-group-item">En az hansı növ üçün xerc çekilib və miqdarı ${typeMinEpense.toUpperCase()}, ${minimumExpenseOfProduct}  AZN</li>
            <li class="list-group-item">Günlük ortalama xerc ne qederdir: ${summaryOfExpense / 7} AZN</li>
            <li class="list-group-item">En çox hansı gün xerc edilib və miqdarı ${maxDay}, ${maxDayExpense}AZN</li>
            <li class="list-group-item">En az hansı gün xerc edilib və miqdarı  ${minimumDay}, ${minimumDayExpense}AZN </li>
        </ul>
      </div>

    `
}

)
