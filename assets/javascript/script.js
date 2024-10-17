// dropdown options
let dropDowns = ['weekly', 'monthly', 'quarterly', 'annual'];

// Income array WIP
let incomes = [
  ['Self Employment income', 'frequency', 1000],
  ['Employment savings & investments', 'weekly', 2000],
  ['State Benefits', 'weekly', 1254],
];

// Function to build the income form
function buildIncome() {
  let incomeForm = '<table>';
  incomeForm += '<tr><th>INCOME</th><th></th><th></th><tr>'; 
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

  incomeForm += '</table>';

  document.getElementById('income-category').innerHTML = incomeForm;
}

// ----------------------------------

buildIncome();
// Function to calculate total income
function calculateTotalIncome() {
    let totalIncome = 0;
    const rows = document.querySelectorAll('.table-row');
    // Loop through each row and calculate the total income
    rows.forEach(row => {
        const amount = row.querySelector('input[type="number"]').value;
        // add if statements to check value of select dropdown - weekly, monthly, quarterly, yearly and convert to weekly
        totalIncome += parseFloat(amount) || 0;
    });
    // Return the total income
    return totalIncome;
}

// Add event listener to the add-income button
document.getElementById('add-income').addEventListener('click', () => {
    const total = calculateTotalIncome();
    // Display the total income in the results div
    document.getElementById('results').textContent = `Total Income: £${total.toFixed(2)}`
});

//-----------------------------------
//  incomeTable += `<tr><td>${incomes[income][0]}</td><td>${incomes[income][1]}</td><td>${incomes[income][2]}</td></tr>`;