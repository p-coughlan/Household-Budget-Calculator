//----- VARIABLES------------------------------------------------
let totalIncome; // Variable to store the total income
let totalExpenditure; // Variable to store the total expenditure
let totalBudget; // Variable to store the total budget
let categoryTotals = []; // Array to store the total of each category
let expenditureForm

//-------------------------------------------------------------------------

// Income array
// 0 = income type, 1 = frequency, 2 = amount
let incomes = [
  // Array of income types // access by incomes[0]
  ["Employment Income", "weekly", 0], // Array of sub categories, frequency, amount)// access by incomes[0][2]
  ["Self Employment", "weekly", 0], // access by incomes[1][2]
  ["Savings & Investment Income", "weekly", 0], 
  ["State Benefits", "weekly", 0],
  ["Property Income", "weekly", 0],
  ["Other Income", "weekly", 0], 
  
];

//-------------------------------------------------------------------------

//Alernative expenditure array structure replacing previous
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
      const categoryClass = expenditure.category.toLowerCase().replace(/\s+/g, '-'); // Create a class name based on the category
      console.log(categoryClass); // Debugging statement to check the class name
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
  document.getElementById("expenditure-section").innerHTML = expenditureForm;
}

//-------------------------------------------------------------------------

// Function to build results table
function buildResults() {
  let resultsTable = "<table id='results-table'>"; // Create a table and add ID so we can target it later
  resultsTable += "<tr><th>Category</th><th>Total Amount</th></tr>"; // Add table headers

  // Loop through the expenditure categories and build the table rows
  expenditures.forEach((expenditure) => {
    resultsTable += `
      <tr class="table-row">
        <td>${expenditure.category}</td>
        <td id="${expenditure.category.replace(/\s+/g, '-').toLowerCase()}-total">£0.00</td> <!-- Placeholder for total amount -->
      </tr>`;
  });

  // Close the table
  resultsTable += "</table>";

  // Add the table to the results div
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
//STEPS
// 1. Loop through each row in the expenditure table
// 2. Get the amount and frequency of each item
// 3. Update the expenditures array with the amount and frequency
// 4. Calculate the total expenditure and category totals
// 5. Update the results table with the category totals
// 6. Return the total expenditure and category totals

//-------------------------------------------------------------------------
/* COMMENT OUT FOR NOW

// Helper function to update the expenditures array
function updateExpendituresArray(category, description, amount, frequency) {
  const categoryObj = expenditures.find(exp => exp.category === category);
  if (categoryObj) {
    const item = categoryObj.items.find(it => it.description === description);
    if (item) {
      item.amount = amount;
      item.frequency = frequency;
    }
  }
}

//-------------------------------------------------------------------------

// Helper function to convert amount to monthly
function convertToMonthly(amount, frequency) {
  switch (frequency) {
    case "weekly":
      return amount * 4.33;
    case "quarterly":
      return amount / 3;
    case "yearly":
      return amount / 12;
    default:
      return amount; // Assume monthly if no match
  }
}

//-------------------------------------------------------------------------

// Helper function to update the expenditures array
function updateExpendituresArray(category, description, amount, frequency) {
  const categoryObj = expenditures.find(exp => exp.category === category);
  if (categoryObj) {
    const item = categoryObj.items.find(it => it.description === description);
    if (item) {
      item.amount = amount;
      item.frequency = frequency;
    }
  }
}

// Helper function to convert amount to monthly
function convertToMonthly(amount, frequency) {
  switch (frequency) {
    case "weekly":
      return amount * 4.33;
    case "quarterly":
      return amount / 3;
    case "yearly":
      return amount / 12;
    default:
      return amount; // Assume monthly if no match
  }
}

// Function to calculate total expenditure and update the expenditures array
function calculateTotalExpenditure() {
  let totalExpenditure = 0;
  let categoryTotals = {}; // Initialize an object to store category totals
  const rows = document.querySelectorAll("#expenditure-table .table-row");

  // Loop through each row and calculate the total expenditure
  rows.forEach((row) => {
    const amount = parseFloat(row.querySelector('input[type="number"]').value) || 0;
    const frequency = row.querySelector("select").value;
    const category = row.closest('table').querySelector('tr strong').textContent.trim(); // Get the category name
    const description = row.querySelector('td').textContent.trim(); // Get the description

    // Debugging statements
    console.log(`Updating category: ${category}, description: ${description}, amount: ${amount}, frequency: ${frequency}`);

    // Update the expenditures array
    updateExpendituresArray(category, description, amount, frequency);

    // Initialize the category total if it doesn't exist
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    // Convert the amount to monthly and add to the category total
    categoryTotals[category] += convertToMonthly(amount, frequency);
  });

  // Calculate the total expenditure
  for (let category in categoryTotals) {
    totalExpenditure += categoryTotals[category];
  }

  // Update the results table with the category totals
  for (let category in categoryTotals) {
    const totalElement = document.getElementById(`${category.replace(/\s+/g, '-').toLowerCase()}-total`);
    if (totalElement) {
      totalElement.textContent = `£${categoryTotals[category].toFixed(2)}`;
    }
  }

  // Debugging statements
  console.log("Updated expenditures array:", expenditures);
  console.log("Category totals:", categoryTotals);
  console.log("Total expenditure:", totalExpenditure);

  // Return the total expenditure and category totals
  return { totalExpenditure, categoryTotals };
}
 END OF COMMENT OUT */
//-------------------------------------------------------------------------

// Function to calculate the total budget
function calculateTotalBudget() {
  const totalIncome = calculateTotalIncome(); // Calculate the total income
  const totalExpenditure = calculateTotalExpenditure().totalExpenditure; // Calculate the total expenditure
  const totalBudget = totalIncome - totalExpenditure; // Calculate the total budget
  // Return the total budget
  return totalBudget;
}

document.addEventListener("click", function (event) {
  // Event listener for the calculate button
  if (event.target.id === "calculate") {
    // If the calculate button is clicked
    const totalIncome = calculateTotalIncome(); // Calculate the total income
    const { totalExpenditure, categoryTotals } = calculateTotalExpenditure(); // Calculate the total expenditure and get category totals
    const totalBudget = calculateTotalBudget(); // Calculate the total budget - income minus expenditure

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

    // Update the results table with the category totals
    for (let category in categoryTotals) {
      const totalElement = document.getElementById(`${category.replace(/\s+/g, '-').toLowerCase()}-total`);
      if (totalElement) {
        totalElement.textContent = `£${categoryTotals[category].toFixed(2)}`;
      }
    }
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
