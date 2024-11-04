Categories reference:
https://www.hl.co.uk/tools/calculators/household-budget-planner

INCOME AND EXPENDITURE DETAILS AND CATEGORIES:
INCOME <i class="fa-solid fa-coins"></i>
Employment Income
Self Employment Income
Savings and Investment Income
State Benefits
Property Income
Other Income

EXPENDITURE
HOUSEHOLD BILLS  <i class="fa-solid fa-house"></i>
Mortgage or Rent 
Council Tax
Maintenance
Utility Bills
Other Household Costs

LEISURE  <i class="fa-solid fa-plane-departure"></i>
Holidays
Hobbys
Sports Memberships
Entertainment
Other Leisure Costs

TRAVEL <i class="fa-solid fa-car"></i>
Fuel
Vehicle Maintenence
Vehicle Tax
Parking Costs
Public Transport
Other Travel Costs

LIVING COSTS <i class="fa-solid fa-cart-shopping"></i>
Groceries
Healthcare
Cigarettes and Tobacco
Other Living Costs

FINANCE <i class="fa-regular fa-credit-card"></i>
Insurance
Loan Repayments
Savings
Other Financial Costs

ADDITIONAL EXPENSES <i class="fa-solid fa-gifts"></i>
Gifts
Charity Donations
School and Childcare
Pet Costs
Other


 





FONT AWESOME 
Calculator: <i class="fa-solid fa-calculator"></i>
House (people with roof): <i class="fa-solid fa-people-roof"></i>

INCOME
Coins (Income Section) <i class="fa-solid fa-coins"></i>

EXPENDITURE
House (Household Bills Section) <i class="fa-solid fa-house"></i>
Plane (Leisure Section) <i class="fa-solid fa-plane-departure"></i>
Car (Travel Section) <i class="fa-solid fa-car"></i>
Shopping Trolley (Household Section) <i class="fa-solid fa-cart-shopping"></i>
Credit Card (Finance Section) <i class="fa-regular fa-credit-card"></i>
Gifts (Additional Expenses Section) <i class="fa-solid fa-gifts"></i>


    Development Issues:
    
    Arrays for Income and Object for Expenditure - Why?

    Separate Income and Expenditure functions both targeting all input data in table - how did I fix this?

    During testing of the table inputs I was getting incorrect calculations - how did I find this? Attributable to incorrect if else statements that converted the frequency to a base figure.

    Parse float - why did I use this?

    Ensuring the input field only accepts numbers by using a regular expression - explain this:
    <input type="number" placeholder="£0.00" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">

<h4>Here is the total amount you spend on each category.</h4>
<h4><i class="fa-solid fa-house"></i> HOUSEHOLD BILLS:</h4>
<h4><i class="fa-solid fa-plane-departure"></i> LEISURE</h4>
<h4><i class="fa-solid fa-car"></i> TRAVEL</h4>
<h4><i class="fa-solid fa-cart-shopping"></i> LIVING COSTS</h4>
<h4><i class="fa-regular fa-credit-card"></i> FINANCE</h4>
<h4><i class="fa-solid fa-gifts"></i> ADDITIONAL COSTS</h4>

PREVIOUS ARRAY STRUCTURE

this method enables easier operation due to logically labelled keys and values

// Expenditure array conatining objects with arrays of items. Each object has a key (category) and an array of items (sub categories, frequency, amount)
const expenditures = [
  // Array of expenditure categories as objects
  // example
  //{
  // "category": [ // key
  // ["sub category", "frequency", amount], (value)
  // ["sub category", "frequency", amount],
  // ["sub category", "frequency", amount],
  // ],
  // },
  {
    "HOUSEHOLD BILLS": [
      // category (key) access by expenditures[0]["HOUSEHOLD BILLS"]
      ["Mortgage or Rent", "weekly", 0], // access by expenditures[0]["HOUSEHOLD BILLS"][0][2]
      ["Council Tax", "weekly", 0], // access by expenditures[0]["HOUSEHOLD BILLS"][1][2]
      ["Maintenance", "weekly", 0], // access by expenditures[0]["HOUSEHOLD BILLS"][2]
      ["Utility Bills", "weekly", 0], // access by expenditures[0]["HOUSEHOLD BILLS"][3]
      ["Other Household Costs", "weekly", 0], // access by expenditures[0]["HOUSEHOLD BILLS"][4]
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
    "TRAVEL": [
      ["Fuel", "weekly", 0],
      ["Vehicle Maintenance", "weekly", 0],
      ["Vehicle Tax", "weekly", 0],
      ["Parking Costs", "weekly", 0],
      ["Public Transport", "weekly", 0],
      ["Other Travel Costs", "weekly", 0],
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
      ["Other", "weekly", 0],
    ],
  },
];