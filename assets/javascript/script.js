//----- VARIABLES------------------------------------------------
let totalIncome
let totalExpenditure
let totalBudget




// dropdown options
let dropDowns = ["weekly", "monthly", "quarterly", "annual"];

// Income array WIP
// 0 = income type, 1 = frequency, 2 = amount
let incomes = [ // Array of income types
  ["Employment Income", "weekly", 0], // Array of sub categories, frequency, amount)
  ["Self Employment", "weekly", 0],
  ["Savings & Investment Income", "weekly", 0],
  ["Savings & Investment Income", "weekly", 0],
  ["Property Income", "weekly", 0],
  ["Other Income", "weekly", 0],
];

// Expenditure array conatining objects with arrays of items. Each object has a key (category) and an array of items (sub categories, frequency, amount)
const expenditures = [
  {
    "HOUSEHOLD BILLS": [                      // category (key) access by expenditures[0]["HOUSEHOLD BILLS"]
      ["Mortgage or Rent", "weekly", 0],      // Value (as an array of sub categories, frequency, amount)
      ["Council Tax", "weekly", 0],           // Value
      ["Maintenance", "weekly", 0],           // Value
      ["Utility Bills", "weekly", 0],         // Value
      ["Other Household Costs", "weekly", 0], // Value access by expenditures[0]["HOUSEHOLD BILLS"][4]
    ],
  },
  {
    "LEISURE": [
      ["Holidays", "weekly", 0], // access third item in the array by expenditures[1]["LEISURE"][2]
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
  let expenditureForm = "<table id='expenditure-table'>"; // Create a table and add ID so we can target it later
  expenditureForm += "<tr><th>EXPENDITURE</th><th></th><th></th><tr>"; // Add table headers
  // Loop through the expenditures array and build the form
  for (expenditure in expenditures) { //
    for (category in expenditures[expenditure]) { // Loop through the categories
      expenditureForm += `<tr><td>${category}</td></tr>`; // Add the category to the table
      for (item in expenditures[expenditure][category]) { // Loop through the items in the category
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
  // Close the table
  expenditureForm += "</table>";
  // Add the form to the expenditure div
  document.getElementById("expenditure").innerHTML = expenditureForm;
}


//-------------------------------------------------------------------------

// Function to build the income form
function buildIncome() {
  let incomeForm = "<table id='income-table'>"; // Create a table and add ID so we can target it later
  incomeForm += "<tr><th>INCOME</th><th></th><th></th><tr>"; // Add table headers
  // Loop through the incomes array and build the form
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
  // Close the table
  incomeForm += "</table>";
  // Add the form to the income div
  document.getElementById("income-category").innerHTML = incomeForm;
}

// ----------------------------------

// Function to calculate total income
function calculateTotalIncome() {
  let totalIncome = 0;
  const rows = document.querySelectorAll("#income-table .table-row");
  // Loop through each row and calculate the total income
  rows.forEach((row) => {
    const amount = row.querySelector('input[type="number"]').value;

    // add if statements to check value of select dropdown - weekly, monthly, quarterly, yearly and convert to weekly
    if (row.querySelector('select').value === "monthly") { // If the value of the select dropdown is monthly, convert to weekly
      totalIncome += parseFloat(amount) * 4.33 || 0; // Convert to weekly by multiplying by 4.33
    }
    if (row.querySelector('select').value === "quarterly") { // If the value of the select dropdown is quarterly, convert to weekly
      totalIncome += parseFloat(amount) / 13 || 0; // Convert to weekly by dividing by 13
    }
    if (row.querySelector('select').value === "yearly") { // If the value of the select dropdown is yearly, convert to weekly
      totalIncome += parseFloat(amount) / 52 || 0; // Convert to weekly by dividing by 52
    }

    totalIncome += parseFloat(amount) || 0; // Add the amount to the total income
  });
  // Return the total income
  return totalIncome;
}
//update the income array with the values from the form----------------------------------

// Function to calculate total expenditure
function calculateTotalExpenditure() {
  let totalExpenditure = 0;
  const rows = document.querySelectorAll("#expenditure-table .table-row");
  // Loop through each row and calculate the total expenditure
  rows.forEach((row) => {
    const amount = row.querySelector('input[type="number"]').value;
    // add if statements to check value of select dropdown - weekly, monthly, quarterly, yearly and convert to weekly

    if (row.querySelector('select').value === "monthly") { // If the value of the select dropdown is monthly, convert to weekly
      totalExpenditure += parseFloat(amount) * 4.33 || 0; // Convert to weekly by multiplying by 4.33
    }
    if (row.querySelector('select').value === "quarterly") { // If the value of the select dropdown is quarterly, convert to weekly
      totalExpenditure += parseFloat(amount) / 13 || 0; // Convert to weekly by dividing by 13
    }
    if (row.querySelector('select').value === "yearly") { // If the value of the select dropdown is yearly, convert to weekly
      totalExpenditure += parseFloat(amount) / 52 || 0; // Convert to weekly by dividing by 52
    }

    totalExpenditure += parseFloat(amount) || 0;
  });
  // Return the total expenditure
  return totalExpenditure;
}

// -------------------------------------------------------------------------------------------

// Function to calculate the total of each category
// add the total of each category to an array for use in the chart
// each amount in the category should be added to create a category total
// use a forEach loop to loop through the categories

// FUNCTION TO CALCULATE CATEGORY TOTALS***************


// Function to calculate the total budget including individual categories
function calculateTotalBudget() {
  let totalBudget = calculateTotalIncome() - calculateTotalExpenditure();
  // Return the total budget
  return totalBudget;
}

document.addEventListener("click", function (event) {
  if (event.target.id === "calculate") {
    totalIncome = calculateTotalIncome();
    totalExpenditure = calculateTotalExpenditure();
    //categoryTotals = calculateCategoryTotals();
    totalBudget = calculateTotalBudget();

    console.log(totalIncome);
    console.log(totalExpenditure);
    //console.log(categoryTotals);
    console.log(totalBudget);

    document.getElementById("income-results").innerHTML = `Your total income is: £${totalIncome.toFixed(2)}`;
    document.getElementById("expenditure-results").innerHTML = `Your total expenditure is: £${totalExpenditure.toFixed(2)}`;
    document.getElementById("budget-results").innerHTML = `Your total budget is: £${totalBudget.toFixed(2)}`;
  }
});

//-----------------------------------
// BUILD INCOME TABLE
// BUILD EXPENDITURE TABLE
// function() FOR CALCULATING TOTAL INCOME
// function() FOR CALCULATING TOTAL EXPENDITURE
// function() FOR CALCULATING CATEGORY TOTALS AND STORING IN ARRAY FOR USE IN CHART
// function() FOR CALCULATING TOTAL BUDGET
//-----------------------------------


// MAIN PROCESSING
// CALL FUNCTIONS
buildIncome(); // Call the function to build the income form
buildExpenditure(); // Call the function to build the expenditure form

// ----------------------------------