const selectWrap = document.querySelector(
  ".rh_prop_search__selectwrap .bs-searchbox"
);
if (selectWrap) {
  selectWrap.style.display = "none";
}
let currentStep = 1;

function navigate(event, direction) {
  event.preventDefault();
  currentStep += direction;
  showStep(currentStep);
}

function showStep(step) {
  let steps = document.querySelectorAll(".step");
  let actions = document.querySelectorAll(".step-actions");

  steps.forEach((el) => {
    el.style.display =
      parseInt(el.getAttribute("data-step")) === step ? "block" : "none";
  });

  actions.forEach((el) => {
    el.style.display =
      parseInt(el.getAttribute("data-step-actions")) === step
        ? "block"
        : "none";
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  showStep(currentStep);
});
