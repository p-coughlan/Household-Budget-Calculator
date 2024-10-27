/* Purpose: To create a budgeting tool that allows users to input their income and expenditure and calculate their total budget.
Author: Patrick Coughlan

Project Plan:
1. Create an array of income types *DONE*
2. Create an array of expenditure categories *DONE*
3. Create a function to build the income table that takes user input *DONE*
4. Create a function to build the expenditure table that takes user input
4. Create a function to calculate the total income, updating the totalIncome variable and the income array
5. Create a function to calculate the total expenditure, updating the totalExpenditure variable and the expenditure array
6. Create a function to calculate the total budget and the category totals, updating the totalBudget variable and the categoryTotals array
7. Create a function to display the total income, total expenditure, total budget and category totals

*/

//-----------------------------------------------------------------

// DECLARE VARIABLES

let totalIncome; // Variable to store the total income
let totalExpenditure; // Variable to store the total expenditure
let totalBudget; // Variable to store the total budget
let categoryTotals = []; // Array to store the total of each category
let IncomeTable

//-----------------------------------------------------------------


// INCOMES ARRAY
// 0 = income type, 1 = frequency, 2 = amount
let incomes = [
    ["Employment Income", "monthly", 0], // Array of sub categories, frequency, amount)// access by incomes[0][2]
    ["Self Employment", "monthly", 0], // access by incomes[1][2]
    ["Savings & Investment Income", "monthly", 0], 
    ["State Benefits", "monthly", 0],
    ["Property Income", "monthly", 0],
    ["Other Income", "monthly", 0], 
    ];

    console.log("Logging from incomes array section:", incomes); 

//-----------------------------------------------------------------

/**
ARRAY OF EXPENDITURE CATEGORIES
Array of Objects:
The expenditures array contains objects, each representing a category.
Category Object:
Each category object has a category property (a string) and an items property (an array of item objects).
Item Objects:
Each item object within the items array has description, frequency, and value properties.
 */

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

    console.log("logging from expenditures array section:", expenditures);

// CONSOLE LOGS FOR ABOVE SECTION

//-----------------------------------------------------------------

// FUNCTION TO BUILD INCOME TABLE
/**
 * Builds the income table using HTML and the incomes array
 * A table row is created for each income type, with input fields for the frequency and amount.
 */
function buildIncomeTable() {
    // Create a table element
    let incomeTable = "<form><H3>INCOME</H3><table id='income-table'>"; // wrap in form element and add table id
    // add table headers
    incomeTable += "<tr></tr>";
    // Loop through the incomes array
    for (income in incomes) {
        incomeTable += `
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
  incomeTable += "</table></form>";
  // Add the form to the income div in index.html
  document.getElementById("income-section").innerHTML = incomeTable; 
}

// CONSOLE LOGS FOR ABOVE SECTION


//-----------------------------------------------------------------

// FUNCTION TO BUILD EXPENDITURE TABLE
/**
 * Builds the expenditure table using HTML and the expenditures array
 * A table row is created for the general category
 * A table row is created for each item within the category, with input fields for the frequency and amount.
 */
function buildExpenditureTable() {
    // Create a table element
    let expenditureTable = "<form><h3>EXPENDITURE</H3><table id='expenditure-table'>"; // wrap in form element and add table id
    // Loop through the expenditures array
    for (category in expenditures) {
        // Add a row for the category
        expenditureTable += `<tr><th colspan="3">${expenditures[category].category}</th></tr>`;
        // Loop through the items in the category
        for (item in expenditures[category].items) {
            expenditureTable += `
            <tr class="table-row">
            <td>${expenditures[category].items[item].description}</td>
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
    }
    // Close the table
    expenditureTable += "</table></form>";
    // Add the form to the expenditure div in index.html
    document.getElementById("expenditure-section").innerHTML = expenditureTable;
}

// CONSOLE LOGS FOR ABOVE SECTION


//-----------------------------------------------------------------


//-----------------------------------------------------------------

// FUNCTION TO CALCULATE TOTAL INCOME

/**
 * Calculates the total income by looping through the incomes array and adding the amount of each income type to the totalIncome variable
 */

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
  
console.log("logging updated array from calculateTotalIncome():",incomes);

  // Return the total income
  return totalIncome;
}


// CONSOLE LOGS FOR ABOVE SECTION

//-----------------------------------------------------------------


// EVENT LISTENER FOR CALCULATE BUTTON AND DISPLAY RESULTS

/**
 * Event listener for the calculate button
 * Calls the calculateTotalIncome function to calculate the total income
 * Displays the total income, total expenditure, and total budget in the results section
 * Calls the buildCategoryTotals function to calculate the total of each expenditure category
 * Stores the total of each category in the categoryTotals array for later use
 */

document.addEventListener("click", function (event) { // Listen for a click event
    if (event.target.id === "calculate-button") { // If the calculate button is clicked
    
    const totalIncome = calculateTotalIncome(); // Calculate the total income

    console.log(totalIncome);

    document.getElementById(
      "income-results"
    ).innerHTML = `Your total monthly income is: £${totalIncome.toFixed(2)}`; // Display the total income
  }
});

//-----------------------------------------------------------------




buildIncomeTable();
buildExpenditureTable();