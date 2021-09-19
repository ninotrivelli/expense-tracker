// Elements

const descInput = document.getElementById('inputDescription');
const amountInput = document.getElementById('inputAmount');
const addBtn = document.getElementById('add');

const historyEl = document.getElementById('history-container');

const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income-total');
const expenseEl = document.getElementById('expense-total');

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

let transactions =
  localStorage.getItem('transactions') !== null
    ? JSON.parse(localStorage.getItem('transactions'))
    : [];

// Functions
function balanceUpdate() {
  balanceEl.innerHTML =
    '$' +
    transactions.reduce((acc, op) => {
      return acc + op.amount;
    }, 0);

  incomeEl.innerHTML =
    '$' +
    transactions
      .filter((op) => op.amount > 0)
      .reduce((acc, op) => {
        return acc + op.amount;
      }, 0);

  expenseEl.innerHTML =
    '$' +
    transactions
      .filter((op) => op.amount < 0)
      .reduce((acc, op) => {
        return acc + op.amount;
      }, 0);
}

function populateHistory() {
  historyEl.innerHTML = '<h2>History</h2>';

  transactions.forEach((operation) => {
    const operationEl = document.createElement('div');
    operationEl.classList.add('operation');
    operation.amount >= 0
      ? operationEl.classList.add('plus')
      : operationEl.classList.add('minus');

    operationEl.setAttribute('data-id', operation.id);
    operationEl.innerHTML = `
        <p id="description">${operation.description}</p>
        <p id="amount">${operation.amount}</p>
        <div class="close-btn" id="close-btn">X</div>`;

    historyEl.appendChild(operationEl);
  });
}

function addOperation() {
  if (descInput.value.trim().length > 0 && amountInput.value != '') {
    const newOperation = new Operation(
      descInput.value,
      Number(amountInput.value)
    );
    transactions.push(newOperation);

    descInput.value = '';
    amountInput.value = '';

    updateLocalStorage();
    populateHistory();
    balanceUpdate();
  }
}

balanceUpdate();
populateHistory();

// Constructor for each operation
class Operation {
  static id = 1;
  constructor(description, amount) {
    this.id = Operation.id++;
    this.description = description;
    this.amount = amount;
  }
}

// Event listeners
addBtn.addEventListener('click', addOperation);
