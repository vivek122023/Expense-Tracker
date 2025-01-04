// Selecting elements
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addTransactionBtn = document.getElementById('add-transaction');

// Transactions array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Update the balance, income, and expense
function updateSummary() {
    const income = transactions
        .filter(item => item.amount > 0)
        .reduce((sum, item) => sum + item.amount, 0);
    const expense = transactions
        .filter(item => item.amount < 0)
        .reduce((sum, item) => sum + Math.abs(item.amount), 0);

    const balance = income - expense;

    incomeEl.textContent = `$${income.toFixed(2)}`;
    expenseEl.textContent = `$${expense.toFixed(2)}`;
    balanceEl.textContent = `$${balance.toFixed(2)}`;
}

// Render transactions
function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.classList.add(transaction.amount > 0 ? 'income' : 'expense');
        li.innerHTML = `
      ${transaction.description}
      <span>${transaction.amount > 0 ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
      <button onclick="removeTransaction(${index})">x</button>
    `;
        transactionList.appendChild(li);
    });
}

// Add a transaction
function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (description === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount');
        return;
    }

    transactions.push({ description, amount });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    descriptionInput.value = '';
    amountInput.value = '';

    renderTransactions();
    updateSummary();
}

// Remove a transaction
function removeTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    updateSummary();
}

// Event listener
addTransactionBtn.addEventListener('click', addTransaction);

// Initial render
renderTransactions();
updateSummary();