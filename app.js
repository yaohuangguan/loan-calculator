document.querySelector("#loan-form").addEventListener("submit", function(e) {
  document.querySelector("#results").style.display = "none";

  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults(e) {
  console.log("submited");

  const amount = document.querySelector("#amount");
  const years = document.querySelector("#years");
  const interest = document.querySelector("#interest");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    document.querySelector("#results").style.display = "block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("please check your numbers");
  }
}

function showError(err) {
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "none";
  const errorDiv = document.createElement("div");

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";

  errorDiv.appendChild(document.createTextNode(err));

  card.insertBefore(errorDiv, heading);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
