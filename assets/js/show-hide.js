document.getElementById('toggleElement').onclick = function() {
    var element = document.getElementById('contentToggle');
    if (element.className === 'descHide') {
      element.className = '';
    //   document.getElementsByTagName('body')[0].className = 'on';
    //   document.getElementById('contentToggle').className = 'active';
    } else {
      element.className = 'descHide';
    //   document.getElementsByTagName('body')[0].className = 'off';
    //   document.getElementById('contentToggle').className = '';
    }
  }