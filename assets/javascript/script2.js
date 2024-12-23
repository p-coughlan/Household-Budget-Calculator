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
8. Create a function to draw a pie chart and legend using the category totals
9. Create a function to switch the results display between weekly, monthly, quarterly, and yearly
10. Create a function to reset the budgeting tool
11. Add event listeners for the calculate button, reset button, and timeframe select
*/

//-----------------------------------------------------------------

// DECLARE GLOBAL VARIABLES //

let totalIncome; // Variable to store the total income
let totalExpenditure; // Variable to store the total expenditure
let totalBudget; // Variable to store the total budget
let categoryTotals = []; // Array to store the total of each category
let IncomeTable; // Variable to store the IncomeTable
let ExpenditureTable; // Variable to store the ExpenditureTable
let categoryTotalsPercentages = []; // Array to store the total of each category as a percentage of the total budget
let resultsTable; // Variable to store the results table

//-----------------------------------------------------------------

// EVENT LISTENERS //
// EVENT LISTENER FOR CALCULATE BUTTON AND DISPLAY RESULTS

/**
 * Event listener for the calculate button
 * Calls the calculateTotalIncome function to calculate the total income
 * Calls the calculateTotalExpenditure function to calculate the total expenditure
 * Calls the calculateTotalBudget function to calculate the total budget
 * Displays the total income, total expenditure, and total budget in the results section
 * Calls the drawPieChart function to draw the pie chart
 * Scrolls to the results section when generated or updated
 * Calls the removeHiddenClass function to display the pie chart, legend, and select timeframe dropdown
 */
document.addEventListener("click", function (event) {
  if (event.target.id === "calculate-button") {

    totalIncome = calculateTotalIncome(); // Calculate total income
    totalExpenditure = calculateTotalExpenditure(); // Calculate total expenditure
    totalBudget = calculateTotalBudget(); // Calculate total budget

    // Display results table
    displayResultsTable();

    // Pie Chart
    drawPieChart(); // Draw the pie chart

    // Scroll to results section when generated or updated
    document
      .getElementById("results-section")
      .scrollIntoView({ behavior: "smooth" });

    // reset selected timeframe button to 'switch-timeframe' on calculate button click
    document.getElementById("select-timeframe").value = "switch-timeframe";

    // Remove hidden class from pie chart and legend, and select timeframe dropdown
    removeHiddenClass();
  }
});

//-----------------------------------------------------------------

// EVENT LISTENER FOR RESET BUTTON
/**
 * Event listener for the reset button
 * Calls the resetBudget function to reset the budgeting tool
 */
document.getElementById("reset").addEventListener("click", resetBudget);

//-----------------------------------------------------------------

// EVENT LISTENER FOR TIMEFRAME SELECT
// event listener with if statement to check if the target is the timeframe select, then call the switchResultsDisplay function
document
  .getElementById("select-timeframe")
  .addEventListener("change", switchResultsDisplay);

//-----------------------------------------------------------------

// CALL FUNCTIONS ON PAGE LOAD
// Call the functions to build the income and expenditure tables on page load
// Call the addHiddenClass function to hide the pie chart, legend, and select timeframe dropdown on page load
// Call the switchResultsDisplay function to switch the results display to monthly on page load
// Call the resetBudget function to reset the budgeting tool on page load

document.addEventListener("DOMContentLoaded", function () {
  buildIncomeTable();
  buildExpenditureTable();
  addHiddenClass();
  switchResultsDisplay();
  resetBudget();
});

//-----------------------------------------------------------------

// INCOMES ARRAY //
// 0 = income type, 1 = frequency, 2 = amount
let incomes = [
  ["Employment Income", "monthly", 0], // Array of sub categories, frequency, amount)// access by incomes[0][2]
  ["Self Employment", "monthly", 0], // access by incomes[1][2]
  ["Savings & Investment Income", "monthly", 0],
  ["State Benefits", "monthly", 0],
  ["Property Income", "monthly", 0],
  ["Other Income", "monthly", 0],
];

// CONSOLE LOGS FOR ABOVE SECTION
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
      { description: "Other Household Costs", frequency: "monthly", value: 0 },
    ],
  },
  {
    category: "LEISURE",
    items: [
      { description: "Holidays", frequency: "monthly", value: 0 },
      { description: "Hobbies", frequency: "monthly", value: 0 },
      { description: "Sports Memberships", frequency: "monthly", value: 0 },
      { description: "Entertainment", frequency: "monthly", value: 0 },
      { description: "Other Leisure Costs", frequency: "monthly", value: 0 },
    ],
  },
  {
    category: "TRAVEL",
    items: [
      { description: "Fuel", frequency: "monthly", value: 0 },
      { description: "Vehicle Maintenance", frequency: "monthly", value: 0 },
      { description: "Vehicle Tax", frequency: "monthly", value: 0 },
      { description: "Parking Costs", frequency: "monthly", value: 0 },
      { description: "Public Transport", frequency: "monthly", value: 0 },
      { description: "Other Travel Costs", frequency: "monthly", value: 0 },
    ],
  },
  {
    category: "LIVING COSTS",
    items: [
      { description: "Groceries", frequency: "monthly", value: 0 },
      { description: "Healthcare", frequency: "monthly", value: 0 },
      { description: "Cigarettes & Tobacco", frequency: "monthly", value: 0 },
      { description: "Other Living Costs", frequency: "monthly", value: 0 },
    ],
  },
  {
    category: "FINANCE",
    items: [
      { description: "Insurance", frequency: "monthly", value: 0 },
      { description: "Loan Repayments", frequency: "monthly", value: 0 },
      { description: "Savings Payments", frequency: "monthly", value: 0 },
      { description: "Other Fianancial Costs", frequency: "monthly", value: 0 },
    ],
  },
  {
    category: "ADDITIONAL EXPENSES",
    items: [
      { description: "Gifts", frequency: "monthly", value: 0 },
      { description: "Charity Donations", frequency: "monthly", value: 0 },
      { description: "School & Childcare", frequency: "monthly", value: 0 },
      { description: "Pet Costs", frequency: "monthly", value: 0 },
      { description: "Other", frequency: "monthly", value: 0 },
    ],
  },
];

// CONSOLE LOGS FOR ABOVE SECTION

console.log("logging from expenditures array section:", expenditures);

//-----------------------------------------------------------------

// CATEGORY COLOURS FOR PIE CHART
// https://www.schemecolor.com/orange-green-blue-pie-chart.php

let categoryColours = [
  "#F47A1F", // 'Princeton Orange' (Orange)
  "#FDBB2F", // 'Saffron' (Golden Yellow)
  "#377B2B", // 'Japanese Laurel' (Green)
  "#7AC142", // 'Apple' (Green)
  "#007CC3", // 'Ocean Boat Blue' (Blue)
  "#00529B", // 'USAFA Blue' (Blue)
];

//-----------------------------------------------------------------

// FUNCTION TO BUILD INCOME TABLE
/**
 * Builds the income table using HTML and category data from the incomes array
 * A table row is created for each income type, with input fields to select the frequency and amount
 * The table is added to the income section in index.html
 */
function buildIncomeTable() {
  // Create a table element
  let incomeTable = "<form><H2>INCOME</H2><table id='income-table'>"; // wrap in form element and add table id
  // add table headers
  incomeTable += "<tr></tr>";
  // Loop through the incomes array and build the table
  for (income in incomes) {
    incomeTable += `
      <tr class="table-row">
      <td class="table-category">${incomes[income][0]}</td>
      <td>
      <select name="" id=""> 
          <option value="weekly">Weekly</option>
          <option value="monthly" selected>Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
      </select>
      </td>
      <td>
      <input type="number" placeholder="£0.00" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
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
 * Data attributes are used to store the indices for easy reference
 * The table is added to the expenditure section in index.html
 */
function buildExpenditureTable() {
  let expenditureTable =
    "<form><h2>EXPENDITURE</H2><table id='expenditure-table'>";
  // Loop through expenditures to dynamically build the table
  //categoryObj = object, catIndex = index
  expenditures.forEach((categoryObj, catIndex) => {
    // Add row for the category title
    expenditureTable += `<tr><th colspan="3">${categoryObj.category}</th></tr>`;

    // Loop through each item in the category to add rows
    categoryObj.items.forEach((item, itemIndex) => {
      // Use data attributes to store the indices for easy reference
      expenditureTable += `
          <tr class="table-row">
              <td class="table-category">${item.description}</td>
              <td>
                  <select data-cat="${catIndex}" data-item="${itemIndex}" class="frequency-select"> 
                      <option value="weekly">Weekly</option>
                      <option value="monthly" selected>Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                  </select>
              </td>
              <td>
                  <input type="number" class="amount-input" data-cat="${catIndex}" data-item="${itemIndex}" placeholder="£0.00">
              </td>
          </tr>`;
    });
  });

  expenditureTable += "</table></form>";
  document.getElementById("expenditure-section").innerHTML = expenditureTable;
}

//-----------------------------------------------------------------

// FUNCTION TO CALCULATE TOTAL INCOME

/**
 * Calculates the total income by looping through the incomes array and adding the amount of each income type to the totalIncome variable
 * Updates the amount in the incomes array based on user input
 * @returns {number} The total income
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

  console.log("logging updated array from calculateTotalIncome():", incomes);

  // Return the total income
  return totalIncome;
}

// CONSOLE LOGS FOR ABOVE SECTION (inside function)

//-----------------------------------------------------------------

// FUNCTION TO CALCULATE TOTAL EXPENDITURE
/**
 * Calculates the total expenditure by looping through the expenditures array and adding the amount of each item to the totalExpenditure variable
 * Uses data attributes to reference the correct item in the expenditures array
 * Updates the amount in the expenditures array based on user input
 * Returns the total expenditure
 * @returns {number} The total expenditure
 */
function calculateTotalExpenditure() {
  let totalExpenditure = 0;
  categoryTotals = []; // Reset category totals before calculation

  // Loop through each category and item to calculate the total expenditure
  // categoryObj = object, catIndex = index
  expenditures.forEach((categoryObj, catIndex) => {
    // Loop through each category and item
    let categoryTotal = 0; // Reset category total for each category

    categoryObj.items.forEach((item, itemIndex) => {
      // Get input values using data attributes to reference the correct item
      const amountInput = document.querySelector(
        `input[data-cat="${catIndex}"][data-item="${itemIndex}"]`
      ).value; // Get the amount of the item
      const frequencySelect = document.querySelector(
        `select[data-cat="${catIndex}"][data-item="${itemIndex}"]`
      ).value; // Get the frequency of the item

      // Update expenditures array with user input
      expenditures[catIndex].items[itemIndex].value =
        parseFloat(amountInput) || 0;
      expenditures[catIndex].items[itemIndex].frequency = frequencySelect;

      // Calculate monthly equivalent based on frequency
      let monthlyAmount = parseFloat(amountInput) || 0;
      if (frequencySelect === "weekly") {
        monthlyAmount *= 4.33;
      } else if (frequencySelect === "quarterly") {
        monthlyAmount /= 3;
      } else if (frequencySelect === "yearly") {
        monthlyAmount /= 12;
      }

      // Update category and total expenditure
      categoryTotal += monthlyAmount;
      totalExpenditure += monthlyAmount;
    });

    // Store the category total in the categoryTotals array
    categoryTotals.push({
      category: categoryObj.category,
      total: categoryTotal.toFixed(2),
    });
  });

  console.log("Total Expenditure:", totalExpenditure.toFixed(2));
  console.log("Category Totals:", categoryTotals);

  return totalExpenditure;
}

// CONSOLE LOGS FOR ABOVE SECTION (inside function)

//-----------------------------------------------------------------

// FUNCTION TO CALCULATE TOTAL BUDGET
/**
 * Calculates the total budget by subtracting the total expenditure from the total income
 * Updates the totalBudget variable
 * @returns {number} The total budget
 */
function calculateTotalBudget() {
  totalBudget = totalIncome - totalExpenditure;
  console.log(
    "Logging from calculateTotalBudget(). Total Budget:",
    totalBudget.toFixed(2)
  );
  return totalBudget;
}

//-----------------------------------------------------------------

// FUNCTION TO DRAW PIE CHART AND LEGEND
/**
 * Draws a pie chart on the canvas element using the categoryTotals array
 * The pie chart will display the percentage of each category as a slice
 * The legend will display the category name, percentage, and value
 * The legend will display the value based on the selected timeframe (weekly, monthly, quarterly, yearly) in the select element that is created in the switchResultsDisplay function
 */
function drawPieChart() {
  const canvas = document.getElementById("pie-chart-canvas");
  const ctx = canvas.getContext("2d");
  const totalExpenditure = categoryTotals.reduce(
    // Calculate the total expenditure by summing the total of each category
    (sum, cat) => sum + parseFloat(cat.total),
    0
  );

  // Clear canvas before drawing new chart
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw pie chart
  let startAngle = 0;
  categoryTotals.forEach((cat, index) => {
    const categoryValue = parseFloat(cat.total); // Get the total value of the category
    const categoryPercentage = (categoryValue / totalExpenditure) * 100;
    const sliceAngle = (categoryPercentage / 100) * 2 * Math.PI;

    // Set color for the slice
    const color = categoryColours[index % categoryColours.length];
    ctx.fillStyle = color;

    // Draw slice
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // Move to center of canvas
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2,
      startAngle,
      startAngle + sliceAngle
    );
    ctx.closePath();
    ctx.fill();

    // Update startAngle for the next slice
    startAngle += sliceAngle;
  });

  // Draw legend
  const legendContainer = document.getElementById("pie-chart-legend");
  legendContainer.innerHTML = ""; // Clear existing legend

  categoryTotals.forEach((cat, index) => {
    const categoryValue = parseFloat(cat.total); //
    const categoryPercentage = (
      (categoryValue / totalExpenditure) *
      100
    ).toFixed(1);
    const color = categoryColours[index % categoryColours.length];

    // Create legend item
    const legendItem = document.createElement("div"); // Create a div for each legend item
    legendItem.style.display = "flex"; // Set display to flex
    legendItem.style.alignItems = "center"; // Align items to center on cross axis
    legendItem.style.marginBottom = "5px"; // Add margin to bottom

    // Color box
    const colorBox = document.createElement("div");

    colorBox.style.width = "30px"; // Set width of box
    colorBox.style.height = "30px"; // Set height of box

    colorBox.style.border = "0.5px solid #333"; // Add border to box

    colorBox.style.minWidth = "30px"; // Limit the shrinkage of the box
    colorBox.style.maxWidth = "30px"; // Limit the shrinkage of the box

    colorBox.style.borderRadius = "1.5rem"; // Make the box round
    colorBox.style.backgroundColor = color; // Set the background color from the categoryColours array
    colorBox.style.marginRight = "10px"; // Add margin to right of box

    // Legend text
    // Legend text will display the category, percentage, and value
    // It will also display the value based on the selected timeframe (weekly, monthly, quarterly, yearly) in the select element

    let timeframe = document.getElementById("select-timeframe").value; // Get the selected timeframe
    const legendText = document.createElement("span"); // Create a span for the legend text
    if (timeframe === "weekly") {
      legendText.textContent = `${cat.category}: ${categoryPercentage}% (£${(
        categoryValue / 4.33
      ).toFixed(2)})`;
    } else if (timeframe === "monthly") {
      legendText.textContent = `${
        cat.category
      }: ${categoryPercentage}% (£${categoryValue.toFixed(2)})`;
    } else if (timeframe === "quarterly") {
      legendText.textContent = `${cat.category}: ${categoryPercentage}% (£${(
        categoryValue * 3
      ).toFixed(2)})`;
    } else {
      legendText.textContent = `${cat.category}: ${categoryPercentage}% (£${(
        categoryValue * 12
      ).toFixed(2)})`;
    }

    // if % is 0 then hide the legend item
    if (categoryPercentage === "0.0") {
      // if category percentage is 0
      legendItem.style.display = "none"; // hide the legend item
    }

    //If no data is entered in the expenditure table, hide the pie chart and legend
    if (totalExpenditure === 0) {
      canvas.style.display = "none"; // Hide the pie chart
      legendContainer.style.display = "none"; // Hide the legend
    } else {
      canvas.style.display = "block"; // Show the pie chart
      legendContainer.style.display = "block"; // Show the legend
    }

    // Append to legend container
    legendItem.appendChild(colorBox);
    legendItem.appendChild(legendText);
    legendContainer.appendChild(legendItem);
  });
}

// CONSOLE LOGS FOR ABOVE SECTION (inside function)

//-----------------------------------------------------------------

// FUNCTION FOR RESET BUTTON
/**
 * Resets the budgeting tool by setting the total income, total expenditure, and total budget to 0
 * Resets the amounts in the incomes and expenditures arrays to 0
 * Clears the input fields in the income and expenditure tables
 * Clears the results section
 * Clears the pie chart and legend
 * Adds the hidden class to the pie chart, legend, and select timeframe dropdown, hiding them until the calculate button is clicked
 * Scrolls to the top of the page
 */
function resetBudget() {
  totalIncome = 0;
  totalExpenditure = 0;
  totalBudget = 0;
  categoryTotals = [];

  // Reset incomes array
  incomes.forEach((income) => {
    income[2] = 0;
  });

  // Reset expenditures array
  expenditures.forEach((category) => {
    category.items.forEach((item) => {
      item.value = 0;
    });
  });

  // Clear input fields in income table
  document.querySelectorAll("#income-table input").forEach((input) => {
    input.value = "";
  });

  // Clear input fields in expenditure table
  document.querySelectorAll("#expenditure-table input").forEach((input) => {
    input.value = "";
  });

  // Clear results section
  // results table
  document.getElementById("results-table").innerHTML = "";
  document.getElementById("pie-chart-legend").innerHTML = "";

  // Clear pie chart
  const canvas = document.getElementById("pie-chart-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // scroll to top of page smoothly
  document.body.scrollIntoView({ behavior: "smooth" });

  // Add hidden class to pie chart and legend, and select timeframe dropdown, hiding them
  addHiddenClass();
}

//-----------------------------------------------------------------

// FUNCTION FOR SWITCHING RESULTS DISPLAY TIMEFRAME
// updates the innerHTML of the results table based on the selected timeframe and redraws the pie chart
/**
 * Switches the results display between weekly, monthly, quarterly, and yearly
 * Updates the total income, total expenditure, and total budget (arrays) based on the selected timeframe
 * Updates the category totals based on the selected timeframe
 * Redraws the pie chart with the updated category totals
 */
function switchResultsDisplay() {
  const timeframe = document.getElementById("select-timeframe").value; // Get the selected timeframe

  let totalIncome = 0; // reset total income
  let totalExpenditure = 0; // reset total expenditure
  let totalBudget = 0; // reset total budget

  // Calculate new totals based on timeframe
  // Default is monthly

  //if statement to check if the timeframe is weekly
  if (timeframe === "weekly") {
    totalIncome = calculateTotalIncome() / 4.33;
    totalExpenditure = calculateTotalExpenditure() / 4.33;
    totalBudget = calculateTotalBudget() / 4.33;

    //if statement to check if the timeframe is monthly (default)
  } else if (timeframe === "monthly") {
    totalIncome = calculateTotalIncome();
    totalExpenditure = calculateTotalExpenditure();
    totalBudget = calculateTotalBudget();
    //if statement to check if the timeframe is quarterly
  } else if (timeframe === "quarterly") {
    totalIncome = calculateTotalIncome() * 3;
    totalExpenditure = calculateTotalExpenditure() * 3;
    totalBudget = calculateTotalBudget() * 3;
    //else statement to check if the timeframe is yearly
  } else {
    totalIncome = calculateTotalIncome() * 12;
    totalExpenditure = calculateTotalExpenditure() * 12;
    totalBudget = calculateTotalBudget() * 12;
  }

  // Display results
  document.getElementById("results-table").innerHTML = `
  <div class="results-table-div">
  <table>
  <th colspan="2">RESULTS</th>
  <tr>
  <td>Your total ${timeframe} income is: </td><td class="td-results">£${totalIncome.toFixed(
    2
  )}</td>
  </tr>
  <tr>
  <td>Your total ${timeframe} expenditure is: </td><td class="td-results">£${totalExpenditure.toFixed(
    2
  )}</td>
  </tr>
  <tr>
  <td>After all expenses, your total ${timeframe} budget is: </td><td class="td-results">£${totalBudget.toFixed(
    2
  )}</td>
  </tr>
  </div>
  </table>`;

  // Redraw pie chart
  drawPieChart();
}

//-----------------------------------------------------------------

// FUNCTIONS FOR REMOVING AND ADDING HIDDEN CLASS
/**
 * Mini function for removing hidden class from pie chart and legend, and select timeframe dropdown on calculate button click
 * This function is called when the calculate button is clicked, to display the pie chart, legend, and select timeframe dropdown
 */
function removeHiddenClass() {
  document.getElementById("pie-chart-legend").classList.remove("hidden");
  document.getElementById("pie-chart-canvas").classList.remove("hidden");
  document.getElementById("select-timeframe").classList.remove("hidden");
  document.getElementById("select-timeframe-div").classList.remove("hidden");
  // loop through the results columns and remove hidden class
  for (
    let i = 0;
    i < document.getElementsByClassName("results-column").length;
    i++
  ) {
    document
      .getElementsByClassName("results-column")
      [i].classList.remove("hidden");
  }
}

/**
 * Mini function for adding hidden class to pie chart and legend, and select timeframe dropdown on page load
 * This function is called on page load or reset, to hide the pie chart, legend, and select timeframe dropdown
 * It also hides the results columns
 * The results columns are displayed when the calculate button is clicked
 */
function addHiddenClass() {
  document.getElementById("pie-chart-legend").classList.add("hidden");
  document.getElementById("pie-chart-canvas").classList.add("hidden");
  document.getElementById("select-timeframe").classList.add("hidden");
  document.getElementById("select-timeframe-div").classList.add("hidden");
  document.getElementsByClassName("results-column");
  // loop through the results columns and add hidden class
  for (
    let i = 0;
    i < document.getElementsByClassName("results-column").length;
    i++
  ) {
    document
      .getElementsByClassName("results-column")
      [i].classList.add("hidden");
  }
}
//-----------------------------------------------------------------
// FUCNTION TO DISPLAY RESULTS TABLE
/**
 * Generates the html for the results table
 * Displays the total income, total expenditure, and total budget in the results section using the totalIncome, totalExpenditure, and totalBudget variables
 */
function displayResultsTable() {
  // Display results
  // Results Table
  document.getElementById("results-table").innerHTML = `
    <div class="results-table-div">
    <table>
    <th colspan="2">RESULTS</th>
    <tr>
    <td>Your total monthly income is: </td><td class="td-results">£${totalIncome.toFixed(
      2
    )}</td>
    </tr>
    <tr>
    <td>Your total monthly expenditure is: </td><td class="td-results">£${totalExpenditure.toFixed(
      2
    )}</td>
    </tr>
    <tr>
    <td>After all expenses, your total monthly budget is: </td><td class="td-results">£${totalBudget.toFixed(
      2
    )}</td>
    </tr>
    </div>
    </table>`;
}

//-----------------------------------------------------------------

// END OF SCRIPT
