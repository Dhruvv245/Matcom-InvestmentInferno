const form = document.querySelector("form");
const form2 = document.getElementById("form2");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const suggestions = document.getElementById("suggestions");
const gender = document.querySelector("#gender");
const rollNumber = document.querySelector("#rollno");
//animation
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

//register-suggestion form logic
// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });

function showErr(input, message) {
  const inputField = input.parentElement;
  inputField.className = "input-field error";
  const small = inputField.querySelector("small");
  small.innerText = message;
  console.log("true");
}

function showSucc(input) {
  const inputField = input.parentElement;
  inputField.className = "input-field success";
  console.log("false");
  return false;
}
function checkEmail(input) {
  const re = /[0-9]+[a-zA-Z]+[0-9]+@nith\.ac\.in/i;
  // const regex = ^[2][2][a-zA-Z]{3}\d{3}@nith[.]ac[.]in$/
  if (re.test(input.value.trim())) {
    showSucc(input);
    return true;
  } else {
    showErr(
      input,
      "Please enter valid college email id (eg.21bma010@nith.ac.in)"
    );
  }
}

function checkGender(input) {
  if (input.value === "M" || input.value === "F") {
    localStorage.setItem("invalidWorkshopForm", false);
    showSucc(input);
  } else {
    localStorage.setItem("invalidWorkshopForm", true);
    showErr(input, "Please enter M or F");
  }
}
function checkSuggestions(input) {
  if (
    input.value.trim() === "" ||
    input.value.trim() === " " ||
    input.value === null
  ) {
    localStorage.setItem("invalidWorkshopForm", true);
    showErr(input, "Please enter M or F");
  } else {
    localStorage.setItem("invalidWorkshopForm", false);
    showSucc(input);
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showErr(input, `${getFieldname(input)} is required`);
    } else {
      showSucc(input);
    }
  });
}
function getFieldname(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    localStorage.setItem("invalidWorkshopForm", true);
    showErr(input, `${getFieldname(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    localStorage.setItem("invalidWorkshopForm", true);
    showErr(
      input,
      `${getFieldname(input)} must be less than ${max} characters`
    );
  } else {
    localStorage.setItaem("invalidWorkshopForm", false);
    showSucc(input);
  }
}

form.addEventListener("submit", function (evt) {
  checkRequired([email, name]);
  if (!checkRequired([email, name]) && !checkEmail(email)) {
    console.log("here");
    evt.preventDefault();
  } else {
    form.addEventListener("submit");
  }
});
