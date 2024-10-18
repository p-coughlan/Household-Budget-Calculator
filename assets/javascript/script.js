//----- VARIABLES------------------------------------------------
let totalIncome
let totalExpenditure
let totalBudget




// dropdown options
let dropDowns = ["weekly", "monthly", "quarterly", "annual"];

// Income array WIP
// 0 = income type, 1 = frequency, 2 = amount
let incomes = [
  ["Employment Income", "weekly", 0],
  ["Self Employment", "weekly", 0],
  ["Savings & Investment Income", "weekly", 0],
  ["Savings & Investment Income", "weekly", 0],
  ["Property Income", "weekly", 0],
  ["Other Income", "weekly", 0],
];

// Expenditure array conatining objects with arrays of items. Each object has a key (category) and an array of items (sub categories, frequency, amount)
const expenditures = [
  {
    "HOUSEHOLD BILLS": [                      // key (category)
      ["Mortgage or Rent", "weekly", 0],      // item 
      ["Council Tax", "weekly", 0],           // item
      ["Maintenance", "weekly", 0],           // item
      ["Utility Bills", "weekly", 0],         // item
      ["Other Household Costs", "weekly", 0], // item
    ],
  },
  {
    "LEISURE": [
      ["Holidays", "weekly", 0],
      ["Hobbies", "weekly", 0],
      ["Sports Memberships", "weekly", 0],
      ["Entertainment", "weekly", 0],
      ["Other Leisure Costs", "weekly", 0],
    ],
  },
  {
    "LIVING COSTS": [
      ["Groceries", "weekly", 0],
      ["Healthcare", "weekly", 0],
      ["Cigarettes & Tobacco", "weekly", 0],
      ["Other Living Costs", "weekly", 0],
    ],
  },
  {
    "FINANCE": [
      ["Insurance", "weekly", 0],
      ["Loan Repayments", "weekly", 0],
      ["Savings Payments", "weekly", 0],
      ["Other Financial Costs", "weekly", 0],
    ],
  },
  {
    "ADDITIONAL EXPENSES": [
      ["Gifts", "weekly", 0],
      ["Charity Donations", "weekly", 0],
      ["School & Childcare", "weekly", 0],
      ["Pet Costs", "weekly", 0],
      ["Other", "weekly", 0]
    ],
  },
];
//-------------------------------------------------------------------------

// Function to build the expenditure form
function buildExpenditure() {
  let expenditureForm = "<table>";
  expenditureForm += "<tr><th>EXPENDITURE</th><th></th><th></th><tr>";
  // Loop through the expenditures array and build the form
  for (expenditure in expenditures) {
    for (category in expenditures[expenditure]) {
      expenditureForm += `<tr><td>${category}</td></tr>`;
      for (item in expenditures[expenditure][category]) {
        expenditureForm += `
          <tr class="table-row">
          <td>${expenditures[expenditure][category][item][0]}</td>
          <td>
          <select name="" id=""> 
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
          </select>
          </td>
          <td>
          <input type="number" placeholder="£0.00">
          </td>
          </tr>`;
      }
    }
  }
  expenditureForm += "</table>";

  document.getElementById("expenditure").innerHTML = expenditureForm;
}


//-------------------------------------------------------------------------

// Function to build the income form
function buildIncome() {
  let incomeForm = "<table>";
  incomeForm += "<tr><th>INCOME</th><th></th><th></th><tr>";
  // Loop through the incomes array and build the form
  // could dropdown be a function?
  for (income in incomes) {
    incomeForm += `
        <tr class="table-row">
        <td>${incomes[income][0]}</td>
        <td>
        <select name="" id=""> 
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
        </select>
        </td>
        <td>
        <input type="number" placeholder="£0.00">
        </td>
        </tr>`;
  }

  incomeForm += "</table>";

  document.getElementById("income-category").innerHTML = incomeForm;
}

// ----------------------------------

// Function to calculate total income
function calculateTotalIncome() {
  let totalIncome = 0;
  const rows = document.querySelectorAll(".table-row");
  // Loop through each row and calculate the total income
  rows.forEach((row) => {
    const amount = row.querySelector('input[type="number"]').value;
    // add if statements to check value of select dropdown - weekly, monthly, quarterly, yearly and convert to weekly
    totalIncome += parseFloat(amount) || 0;
  });
  // Return the total income
  return totalIncome;
}
//update the income array with the values from the form----------------------------------

// Function to calculate total expenditure
function calculateTotalExpenditure() {
  let totalExpenditure = 0;
  const rows = document.querySelectorAll(".table-row");
  // Loop through each row and calculate the total expenditure
  rows.forEach((row) => {
    const amount = row.querySelector('input[type="number"]').value;
    // add if statements to check value of select dropdown - weekly, monthly, quarterly, yearly and convert to weekly
    totalExpenditure += parseFloat(amount) || 0;
  });
  // Return the total expenditure
  return totalExpenditure;
}
//***** THESE FUNTIONS NEED TO TARGET THE INCOME AND EXPENDITURE FORMS SEPARATELY! */
//*** CURRENTLY TAKING DATA FROM ALL ROWS IN FORM - USE IDs OR CLASSES TO IDENTIFY */


// Add event listener to the add-income button
document.getElementById("calculate-budget").addEventListener("click", () => {
  const total = calculateTotalIncome();


  // Display the total income in the results div
  document.getElementById(
    "income-results"
  ).textContent = `Yout total income: £${total.toFixed(2)}`;
});

//-----------------------------------
//  incomeTable += `<tr><td>${incomes[income][0]}</td><td>${incomes[income][1]}</td><td>${incomes[income][2]}</td></tr>`;

// MAIN PROCESSING
// CALL FUNCTIONS
buildIncome();
buildExpenditure();

// ----------------------------------