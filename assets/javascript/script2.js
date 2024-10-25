/* Purpose: To create a budgeting tool that allows users to input their income and expenditure and calculate their total budget.
Author: Patrick Coughlan

Project Plan:
1. Create an array of income types
2. Create an array of expenditure categories
3. Create a function to build the income table that takes user input
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

    console.log(incomes); 

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

    console.log(expenditures);

// CONSOLE LOGS FOR ABOVE SECTION

//-----------------------------------------------------------------

// FUNCTION TO BUILD INCOME TABLE
/**
 * Builds the income table using HTML and the incomes array
 * A table row is created for each income type, with input fields for the frequency and amount.
 */
function buildIncomeTable() {
    // Create a table element
    let incomeTable = "<table id='income-table'>"; // add table id
    // add table headers
    incomeTable += "<tr><th>Income Type</th><th>Frequency</th><th>Amount</th></tr>";
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
  incomeTable += "</table>";
  // Add the form to the income div in index.html
  document.getElementById("income-section").innerHTML = incomeTable; 
}

// CONSOLE LOGS FOR ABOVE SECTION


//-----------------------------------------------------------------


buildIncomeTable();
