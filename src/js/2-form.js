const form = document.querySelector(".feedback-form");
const input = form.elements.email;
const textarea = form.elements.message;
const STORAGE_KEY = "feedback-form-state";

let formData = { email: "", message: "" };

populateForm();

form.addEventListener("input", event => {
  if (event.target.name === "email" || event.target.name === "message") {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const { email, message } = formData;

  if (email && message) {
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: "", message: "" };
    form.reset();
  } else {
    alert("Fill please all fields");
  }
});

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  formData = { ...formData, ...savedData };

  input.value = formData.email || "";
  textarea.value = formData.message || "";
}