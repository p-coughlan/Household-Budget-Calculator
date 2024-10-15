//     [category, [drop-down-box], amount]
 
let dropDowns = ["weekly", "monthly", "quarterly", "annual"];
 
let incomes = [
    ["Self Employment income", "weekly", 1000],
    ["Employment savings & investments", "weekly", 2000],
    ["State Benefits", "weekly", 1254],
];
 
let houseHoldBills = [
    ["Mortgage / Rent", "weekly", 0],
    ["Council Tax", "weekly", 0],
    ["Utilitiy Bills", "weekly", 0],
];
 
//  incomeTable += `<tr><td>${incomes[income][0]}</td><td>${incomes[income][1]}</td><td>${incomes[income][2]}</td></tr>`;
 
function buildIncome() {
    let incomeForm = "<form>";
    for (income in incomes) {
        incomeForm += `<fieldset><label>${incomes[income][0]}</label>
        <input type="text" value=${incomes[income][1]}>
        <input type="text" value= ${incomes[income][2]}></fieldset>`;
    }
 
    incomeForm += "</form>";
 
    document.getElementById("income").innerHTML = incomeForm;
}
 
// ----------------------------------
 
buildIncome();