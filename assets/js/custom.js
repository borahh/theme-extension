const selectWrap = document.querySelector(
  ".rh_prop_search__selectwrap .bs-searchbox"
);
if (selectWrap) {
  selectWrap.style.display = "none";
}
let currentStep = 1;

function navigate(event, direction) {
  event.preventDefault();
  document.getElementById("step" + currentStep).style.display = "block"; // Show the current step
  document.getElementById("action" + currentStep).style.display = "none"; // Hide the current step action

  currentStep += direction; // Move to the next or previous step

  document.getElementById("step" + currentStep).style.display = "block"; // Show the new step
  document.getElementById("action" + currentStep).style.display = "block"; // Show the new step action
}

// Initialize the view
document.getElementById("step2").style.display = "none"; // Initially hide step 2
document.getElementById("action2").style.display = "none"; // Initially hide action 2
