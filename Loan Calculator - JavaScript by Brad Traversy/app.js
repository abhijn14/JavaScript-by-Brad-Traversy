document.querySelector('form').addEventListener('submit', function(e) {
  //Hide Result
  document.getElementById('results').style.display = 'none';

  // Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResult, 1000);

  e.preventDefault();
});

function calculateResult(e) {
  document.getElementById('loading').style.display = 'none';
  const loanAmount = Number(document.querySelector('#amount').value);
  const annualInterest = Number(document.querySelector('#interest').value);
  const years = Number(document.querySelector('#years').value);
  let monthlyPayment = document.querySelector('#monthly-payment');
  let totalPayment = document.querySelector('#total-payment');
  let totalInterest = document.querySelector('#total-interest');
  
  const principal = parseFloat(loanAmount);
  const calculatedInterest = parseFloat(annualInterest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  // Compute Monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}