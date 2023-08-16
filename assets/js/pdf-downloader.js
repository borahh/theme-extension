window.addEventListener("load", function () {
  if (document.getElementById("printingMode")) {
    var delayInMilliseconds = 2000; //2 second
    setTimeout(function () {
      javascript: window.print();
    }, delayInMilliseconds);
  }
});
