const qrForm = document.getElementById("qr-form");
const inputField = document.getElementById("qr-input")

qrForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = inputField.value;

  localStorage.setItem("qrUrl", value)

  window.location.href = 'code-page.html'
});
