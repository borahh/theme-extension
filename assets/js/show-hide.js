document.getElementById('toggleElement').onclick = function() {
    var element = document.getElementById('contentToggle');
    if (element.classList.contains("descHide")) {
        element.classList.remove("descHide")
    } else {
        element.classList.add("descHide")
    }
  }