//----- VARIABLES------------------------------------------------
let totalIncome; // Variable to store the total income
let totalExpenditure; // Variable to store the total expenditure
let totalBudget; // Variable to store the total budget
let categoryTotals = []; // Array to store the total of each category

// dropdown options
let dropDowns = ["weekly", "monthly", "quarterly", "annual"]; //**** are these needed?****

// Income array
// 0 = income type, 1 = frequency, 2 = amount
let incomes = [
  // Array of income types // access by incomes[0]
  ["Employment Income", "weekly", 0], // Array of sub categories, frequency, amount)// access by incomes[0][2]
  ["Self Employment", "weekly", 0], // access by incomes[1][2]
  ["Savings & Investment Income", "weekly", 0], // access by incomes[2][2]
  ["State Benefits", "weekly", 0], // access by incomes[3][2]
  ["Property Income", "weekly", 0], // access by incomes[4][2]
  ["Other Income", "weekly", 0], // access by incomes[5][2] how to access the amount?
  
];

// Alternative expenditure array
//Alernative expenditure structure
let expenditures = [
  {
      category: "HOUSEHOLD BILLS",
      items: [
          { description: "Mortgage or Rent", frequency: "monthly", value: 0 },
          { description: "Council Tax", frequency: "monthly", value: 0 },
          { description: "Maintenance", frequency: "monthly", value: 0 },
          { description: "Utility Bills", frequency: "monthly", value: 0 },
          { description: "Other Household Costs", frequency: "monthly", value: 0 }
      ]
  },
  {
    category: "LEISURE",
    items: [
        { description: "Holidays", frequency: "monthly", value: 0 },
        { description: "Hobbies", frequency: "monthly", value: 0 },
        { description: "Sports Memberships", frequency: "monthly", value: 0 },
        { description: "Entertainment", frequency: "monthly", value: 0 },
        { description: "Other Leisure Costs", frequency: "monthly", value: 0 }
    ]
},
{
  category: "TRAVEL",
  items: [
      { description: "Fuel", frequency: "monthly", value: 0 },
      { description: "Vehicle Maintenance", frequency: "monthly", value: 0 },
      { description: "Vehicle Tax", frequency: "monthly", value: 0 },
      { description: "Parking Costs", frequency: "monthly", value: 0 },
      { description: "Public Transport", frequency: "monthly", value: 0 },
      { description: "Other Travel Costs", frequency: "monthly", value: 0 }
  ]
},
{
  category: "LIVING COSTS",
  items: [
      { description: "Groceries", frequency: "monthly", value: 0 },
      { description: "Healthcare", frequency: "monthly", value: 0 },
      { description: "Cigarettes & Tobacco", frequency: "monthly", value: 0 },
      { description: "Other Living Costs", frequency: "monthly", value: 0 },
  ]
},
{
  category: "FINANCE",
  items: [
      { description: "Insurance", frequency: "monthly", value: 0 },
      { description: "Loan Repayments", frequency: "monthly", value: 0 },
      { description: "Savings Payments", frequency: "monthly", value: 0 },
      { description: "Other Fianancial Costs", frequency: "monthly", value: 0 },
  ]
},
{
  category: "ADDITIONAL EXPENSES",
  items: [
      { description: "Gifts", frequency: "monthly", value: 0 },
      { description: "Charity Donations", frequency: "monthly", value: 0 },
      { description: "School & Childcare", frequency: "monthly", value: 0 },
      { description: "Pet Costs", frequency: "monthly", value: 0 },
      { description: "Other", frequency: "monthly", value: 0 },
  ]
}
];

//-------------------------------------------------------------------------

// Function to build the income form
function buildIncome() { 
  let incomeForm = "<table id='income-table'>"; // Create a table and add ID so we can target it later
  incomeForm += "<tr><th>INCOME</th><th></th><th></th><tr>"; // Add table headers
  // Loop through the incomes array and build the form
  for (income in incomes) { // Loop through the income types
    incomeForm += `
        <tr class="table-row">
        <td>${incomes[income][0]}</td>
        <td>
        <select name="" id=""> 
              <option value="weekly">Weekly</option>
              <option value="monthly" selected>Monthly</option>
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

//-------------------------------------------------------------------------

// Function to build the expenditure form
function buildExpenditure() {
  let expenditureForm = "<table id='expenditure-table'>"; // Create a table and add ID so we can target it later
  expenditureForm += "<tr><th>EXPENDITURE</th><th></th><th></th></tr>"; // Add table headers

  // Loop through the expenditure categories and build the form
  expenditures.forEach((expenditure) => {
    // Add the category row
    expenditureForm += `<tr><td colspan="3"><strong>${expenditure.category}</strong></td></tr>`;

    // Loop through the items in the category
    expenditure.items.forEach((item) => {
      expenditureForm += `
        <tr class="table-row">
          <td>${item.description}</td>
          <td>
            <select name="" id=""> 
              <option value="weekly" ${item.frequency === "weekly" ? "selected" : ""}>Weekly</option>
              <option value="monthly" ${item.frequency === "monthly" ? "selected" : ""}>Monthly</option>
              <option value="quarterly" ${item.frequency === "quarterly" ? "selected" : ""}>Quarterly</option>
              <option value="yearly" ${item.frequency === "yearly" ? "selected" : ""}>Yearly</option>
            </select>
          </td>
          <td>
            <input type="number" placeholder="£0.00" value="${item.amount}">
          </td>
        </tr>`;
    });
  });

  // Close the table
  expenditureForm += "</table>";

  // Add the form to the expenditure div
  document.getElementById("expenditure-sectionz`").innerHTML = expenditureForm;
}

//-------------------------------------------------------------------------

// Function to build results table

function buildResults() {
  let resultsTable = "<table id='results-table'>"; // Create a table and add ID so we can target it later
  resultsTable +=
    "<tr><th>This is the total amount you spend on each category:</th><th></th><th></th></tr>"; // Add table headers

  // Loop through the expenditure categories and build the form
  for (let expenditure in expenditures) {
    // Loop through the categories
    for (let category in expenditures[expenditure]) {
      // Loop through the items in the category
      resultsTable += `
        <tr class="table-row">
          <td>${category}</td>
          <td>: AMOUNT</td>
        </tr>`;
    }
  }
  // Close the table
  resultsTable += "</table>";

  // Add the form to the results div
  document.getElementById("results-display").innerHTML = resultsTable;
}

// -------------------------------------------------------------------------

// Function to calculate total income
function calculateTotalIncome() {
  let totalIncome = 0;
  const rows = document.querySelectorAll("#income-table .table-row");
  // Loop through each row and calculate the total income
  rows.forEach((row) => {
    // check if the amount is a number

    // add variable for income amount
    const amount = row.querySelector('input[type="number"]').value; // Get the amount of the income
    const incomeIndex = Array.from(rows).indexOf(row); // Get the index of the row
    incomes[incomeIndex][2] = amount; // Update the amount in the incomes array
    
    // add variable for frequency
    const frequency = row.querySelector("select").value; // Get the frequency of the income
    const income = Array.from(rows).indexOf(row); // Get the index of the row
    incomes[income][1] = frequency; // Update the frequency in the incomes array

    // if else statement to check frequency and convert to monthly
    // MONTHLY IS THE DEFAULT VALUE
    if (frequency === "weekly") {
      totalIncome += parseFloat(amount) * 4.33 || 0; // Convert to monthly by multiplying by 4.33
    } else if (frequency === "quarterly") {
      totalIncome += parseFloat(amount) / 3 || 0; // Convert to monthly by dividing by 3
    } else if (frequency === "yearly") {
      totalIncome += parseFloat(amount) / 12 || 0; // Convert to monthly by dividing by 12
    } else {
      totalIncome += parseFloat(amount) || 0; // Add the amount to the total income
    }
  });
  
console.log(incomes);

  // Return the total income
  return totalIncome;
}
//-------------------------------------------------------------------------

// Function to calculate total expenditure
function calculateTotalExpenditure() {
  let totalExpenditure = 0;
  const rows = document.querySelectorAll("#expenditure-table .table-row");
  // Loop through each row and calculate the total expenditure
  rows.forEach((row) => {
    
    
    
    const amount = row.querySelector('input[type="number"]').value;
    // update the amount in the correct category in the expenditures array
    // add variable for frequency
    const frequency = row.querySelector("select").value;
    // update the frequency in the expenditures array

    // if else statement to check frequency and convert to monthly
    // MONTHLY IS THE DEFAULT VALUE
    if (frequency === "weekly") {
      totalExpenditure += parseFloat(amount) * 4.33 || 0; // Convert to monthly by multiplying by 4.33
    } else if (frequency === "quarterly") {
      totalExpenditure += parseFloat(amount) / 3 || 0; // Convert to monthly by dividing by 3
    } else if (frequency === "yearly") {
      totalExpenditure += parseFloat(amount) / 12 || 0; // Convert to monthly by dividing by 12
    } else {
      totalExpenditure += parseFloat(amount) || 0; // Add the amount to the total income
    }
  });
  //update arrays***************************************************

  // Return the total expenditure
  return totalExpenditure;
}

// -------------------------------------------------------------------------------------------

// Function to calculate the total budget (*******including individual categories??********)
function calculateTotalBudget() {
  let totalBudget = calculateTotalIncome() - calculateTotalExpenditure();
  // Return the total budget
  return totalBudget;
}

document.addEventListener("click", function (event) {
  // Event listener for the calculate button
  if (event.target.id === "calculate") {
    // If the calculate button is clicked
    totalIncome = calculateTotalIncome(); // Calculate the total income
    totalExpenditure = calculateTotalExpenditure(); // Calculate the total expenditure
    totalBudget = calculateTotalBudget(); // Calculate the total budget - income minus expenditure

    console.log(totalIncome);
    console.log(totalExpenditure);
    console.log(totalBudget);

    document.getElementById(
      "income-results"
    ).innerHTML = `Your total monthly income is: £${totalIncome.toFixed(2)}`; // Display the total income
    document.getElementById(
      "expenditure-results"
    ).innerHTML = `Your total expenditure is: £${totalExpenditure.toFixed(2)}`; // Display the total expenditure
    document.getElementById(
      "budget-results"
    ).innerHTML = `Your total budget is: £${totalBudget.toFixed(2)}`; // Display the total budget
  }
});

//-------------------------------------------------------------------------

// Function to calculate the total of each category
// add the total of each category to an array for use in the chart
// each amount in the category should be added to create a category total


//-------------------------------------------------------------------------
//Functions for buttons to display weekly, monthly, quarterly, yearly
// add event listeners to buttons
// better as an up/down button to change the timeframe (interactive arrows that move the timeframe up or down)
function resetButton() {
  // reset the form
  // clear the results
  // hide the results
}
function displayWeekly() {
  // display weekly amounts
}
function displayMonthly() {
  // display monthly amounts
}
function displayQuarterly() {
  // display quarterly amounts
}
function displayYearly() {
  // display annually
  
}
//-------------------------------------------------------------------------

// MAIN PROCESSING
// CALL FUNCTIONS
buildIncome(); // Call the function to build the income form (on page load?)
buildExpenditure(); // Call the function to build the expenditure form (on page load?)
buildResults(); // Call the function to build the results table (hidden until calculate button is clicked)

// ----------------------------------
