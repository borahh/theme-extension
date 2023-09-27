let currentStep = 1;

document.addEventListener("DOMContentLoaded", function () {
  showStep(currentStep);
});

function navigate(direction) {
  currentStep += direction;
  showStep(currentStep);
}

function showStep(step) {
  let steps = document.querySelectorAll(".step");
  steps.forEach((el, index) => {
    el.classList.remove("active");
    if (index + 1 === step) {
      el.classList.add("active");
    }
  });
}
