const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addExpenseButton = document.getElementById("add-expense");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");
let totalAmount = 0;
let expenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

if (expenses.length > 0) {
  renderExpenses();
  updateTotal();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addExpense();
  }
});
addExpenseButton.addEventListener("click", () => {
  addExpense();
});

function addExpense() {
  const amount = parseFloat(amountInput.value.trim());
  const description = descriptionInput.value.trim();

  if (description === "") {
    alert("Vui lòng nhập nội dung");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Vui lòng nhập số tiền phù hợp");
    return;
  }

  let expense = { description, amount, id: Date.now() };
  console.log(expense);
  expenses.push(expense);
  console.log(expenses);
  renderExpenses();
  updateTotal();
  saveToLocalStorage();
  descriptionInput.value = "";
  amountInput.value = "";
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.textContent = `${expense.description} : ${expense.amount.toLocaleString(
      "vi-vn"
    )} VND`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.onclick = () => removeExpense(expense.id);
    li.appendChild(deleteButton);
    expenseList.appendChild(li);
  });
}

function removeExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
  updateTotal();
  saveToLocalStorage();
}

function updateTotal() {
  totalAmount = expenses.reduce((sum, expense) => (sum += expense.amount), 0);
  totalAmountDisplay.textContent = totalAmount.toLocaleString("vi-vn");
}

function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
