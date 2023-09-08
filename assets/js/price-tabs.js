var selectedYear;

function openYear(evt, year) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Get the selected room number
  var selectedRoom = document.getElementById("rvr-guests").value;

  var yearSelectorPart;
  if (year.includes(",")) {
    // For multiple years, we create a combined selector
    var years = year.split(",");
    yearSelectorPart = years.map((y) => ".year-" + y.trim()).join(", ");
  } else {
    yearSelectorPart = ".year-" + year;
  }

  // Get all elements with the class "year-" + year and "data-room=" + selectedRoom and show them
  var yearRoomElements = document.querySelectorAll(
    yearSelectorPart + '[data-room="' + selectedRoom + '"]'
  );

  for (i = 0; i < yearRoomElements.length; i++) {
    yearRoomElements[i].style.display = "grid";
  }

  // Add an "active" class to the button that opened the tab
  evt.currentTarget.className += " active";

  // Get the currently selected type (day or week)
  var type = document
    .querySelector(".day-week-tablinks.active")
    .classList.contains("per-day")
    ? "per-day"
    : "per-week";

  selectedYear = year;

  // Call showDayOrWeek function to show the correct columns
  showDayOrWeek(type);
}

// Attach the event listener to the document
document.addEventListener("change", function (event) {
  // Check if the event target matches the select field
  if (event.target.matches("#rvr-guests")) {
    // Get all elements with class="tablinks" and remove the class "active"
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Get the currently active day-week-tablinks
    var activeTab = document.querySelector(".day-week-tablinks.active");
    if (activeTab) {
      // Get the type from the class name
      var type = activeTab.classList.contains("per-day")
        ? "per-day"
        : "per-week";
      // Call the showDayOrWeek function with the current type
      showDayOrWeek(type);
    }
    // If a year has been selected before...
    if (selectedYear) {
      // Get all buttons with class="tablinks"
      var allButtons = document.querySelectorAll(".tablinks");

      // Loop through all buttons
      for (var i = 0; i < allButtons.length; i++) {
        // Check if the onclick attribute contains the selected year
        if (allButtons[i].getAttribute("onclick").includes(selectedYear)) {
          // If it does, simulate a click on it
          allButtons[i].click();
          break; // Exit the loop
        }
      }
    }
  }
});

/** Per Dat Per Week Filter */
function showDayOrWeek(type) {
  // Get all elements with class="day-week-tablinks" and remove the class "active"
  var tablinks = document.getElementsByClassName("day-week-tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Add an "active" class to the button that opened the tab
  document.querySelector(".day-week-tablinks." + type).className += " active";

  // Get all elements with class="per-day-column" and "per-week-column"
  var perDayColumns = document.getElementsByClassName("per-day-column");
  var perWeekColumns = document.getElementsByClassName("per-week-column");

  // Hide or show columns based on the selected type and whether the row is currently visible
  for (var i = 0; i < perDayColumns.length; i++) {
    if (perDayColumns[i].parentNode.style.display !== "none") {
      perDayColumns[i].style.display =
        type === "per-day" ? "table-cell" : "none";
    }
  }
  for (var i = 0; i < perWeekColumns.length; i++) {
    if (perWeekColumns[i].parentNode.style.display !== "none") {
      perWeekColumns[i].style.display =
        type === "per-week" ? "table-cell" : "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var currentYear = new Date().getFullYear();

    // Try to select the tablink for the current year
    var currentYearTablink = document.querySelector(
      ".tablinks.year-" + currentYear
    );

    // If a tablink for the current year exists, simulate a click on it
    if (currentYearTablink) {
      currentYearTablink.click();
    } else {
      console.log(document.querySelector(".tablinks"));
      // If a tablink for the current year does not exist, simulate a click on the first tablink
      document.querySelector(".tablinks").click();
    }
  }, 500); // 500 milliseconds delay

  // Simulate a change event on the "rvr-guests" select field
  var event = new Event("change");
  document.getElementById("rvr-guests").dispatchEvent(event);
  // Simulate a click on the "Per Day" tab
  document.querySelector(".day-week-tablinks.per-week").click();
});

window.onload = function () {
  var currentYear = new Date().getFullYear();

  // Try to select the tablink for the current year
  var currentYearTablink = document.querySelector(
    ".tablinks.year-" + currentYear
  );

  // If a tablink for the current year exists, simulate a click on it
  if (currentYearTablink) {
    currentYearTablink.click();
  } else {
    // If a tablink for the current year does not exist, simulate a click on the first tablink
    document.querySelector(".tablinks").click();
  }

  // Simulate a change event on the "rvr-guests" select field
  var event = new Event("change");
  document.getElementById("rvr-guests").dispatchEvent(event);
  // Simulate a click on the "Per Day" tab
  document.querySelector(".day-week-tablinks.per-week").click();
};
