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
    var slicedArray = children.slice(0, 3);
    var height = 0;
    slicedArray.forEach(element => {
        height = getAbsoluteHeight(element) + height;
    });

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