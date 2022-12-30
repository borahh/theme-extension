function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el; 
  
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
                 parseFloat(styles['marginBottom']);
  
    return Math.ceil(el.offsetHeight + margin);
}
  
function borahh_get_height() {
    var parent = document.getElementById('contentToggle');
    var children = parent.querySelectorAll('p');
    var height = 0;
    for (let index = 0; index = 2 ; index++) {
        height = height + getAbsoluteHeight(index);
        
    }

    return height;
}
document.getElementById('toggleElement').onclick = function () {
    var element = document.getElementById('contentToggle');
    if (element.classList.contains("descHide")) {
        element.classList.remove("descHide")
    } else {
        element.classList.add("descHide")
    }
    console.log(borahh_get_height());
  }