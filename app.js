var result  = document.getElementsByClassName('result')[0],
    btns    = document.getElementsByClassName('btns')[0],
    btn     = document.getElementsByClassName('btn'),
    btnhelp = document.getElementById('helpbtn'),
    body    = document.getElementsByClassName('container')[0],
    help    = document.getElementsByClassName('help'),

    btn7        = btn[0],
    btn8        = btn[1],
    btn9        = btn[2],
    btnDivide   = btn[3],
    btn4        = btn[4],
    btn5        = btn[5],
    btn6        = btn[6],
    btnMultiply = btn[7],
    btn1        = btn[8],
    btn2        = btn[9],
    btn3        = btn[10],
    btnSubtract = btn[11],
    btn0        = btn[12],
    btnDot      = btn[13],
    btnEqual    = btn[14],
    btnAdd      = btn[15],

    numbers = new Array(btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9),

    a = result.innerHTML,b, c,

    checkResult = true;

function initialize() {
  result.innerHTML = '0';
}

function innerInitialize() {
  a = b = 0;
  checkResult = true;
  btnEqual.onclick = function() {}
}

function fullInitialize() {
  result.innerHTML = '0';
  a = b = c = 0;
  checkResult = true;
}

function showHelp() {
  result.style.filter = 'blur(10px)';
  btns.style.filter = 'blur(10px)';
  result.style.opacity = '0.4';
  btns.style.opacity = '0.4';
  help[0].style.display = 'block';
  help[1].style.display = 'block';
  help[0].style.opacity = '1';
  help[1].style.opacity = '1';
}

function hiddenHelp() {
  result.style.filter = 'initial';
  btns.style.filter = 'initial';
  result.style.opacity = 'initial';
  btns.style.opacity = 'initial';
  help[0].style.opacity = '0';
  help[1].style.opacity = '0';
  setTimeout("help[0].style.display = 'none';", 300);
  setTimeout("help[1].style.display = 'none';", 300);
}

function insertNumber(number) {
  if (result.innerHTML == '0' || checkResult) {
    result.innerHTML = '';
    result.insertAdjacentHTML('beforeend', number);
    checkResult = false;
  } else if (result.innerHTML.length < 11) {
    result.insertAdjacentHTML('beforeend', number);
    checkResult = false;
  }
}

function checkDot(obj, max) {
  for (i in obj) {
    if (obj[i] == '.' || i == max) {
      return false;
    } else if (i == obj.length - 1) {
      return true;
    }
  }
}

function insertDot() {
  if (checkResult) {
    initialize();
    result.insertAdjacentHTML('beforeend', '.');
  } else if (checkDot(result.innerHTML, 9)) {
    result.insertAdjacentHTML('beforeend', '.');
  }
  checkResult = false;
}

function compute(symbol) {
  a = result.innerHTML;
  switch (symbol) {
    case 'add':
      btnEqual.onclick = function() {equal('add');}
      break;
    case 'substract':
      btnEqual.onclick = function() {equal('substract');}
      break;
    case 'multiply':
      btnEqual.onclick = function() {equal('multiply');}
      break;
    case 'divide':
      btnEqual.onclick = function() {equal('divide');}
      break;
  }
  checkResult = true;
}

function equal(symbol) {
  b = result.innerHTML;
  c = Number(result.innerHTML);
  switch (symbol) {
    case 'add':
      c =  Number(a) + Number(b);
      break;
    case 'substract':
      c =  Number(a) - Number(b);
      break;
    case 'multiply':
      c =  Number(a) * Number(b);
      break;
    case 'divide':
      c =  Number(a) / Number(b);
      break;
  }
  result.innerHTML = '';
  if (symbol == 'divide' && b == 0) {
    result.innerHTML = 'MATH ERROR';
  } else if (String(c).length > 11) {
    if (Number(c) > 99999999999) {
      result.innerHTML = 'MAX LENGTH';
    } else if (String(c)[10] == '.') {
      for (var i = 0; i < 10; i++) {
        result.insertAdjacentHTML('beforeend', String(c)[i]);
      }
    } else {
      for (var i = 0; i < 11; i++) {
        result.insertAdjacentHTML('beforeend', String(c)[i]);
      }
    }
  } else {
    for (var j = 0; j < String(c).length; j++) {
      result.insertAdjacentHTML('beforeend', String(c)[j]);
    }
  }
  innerInitialize();
}

function activeBtn() {
  for (i in numbers) {
    eval("numbers[i].onclick = function () {insertNumber("+i+");}"); 
  }
  btnDot.onclick      = function() {insertDot();};
  result.onclick      = function() {fullInitialize();};
  btnAdd.onclick      = function() {compute('add');};
  btnMultiply.onclick = function() {compute('multiply');};
  btnSubtract.onclick = function() {compute('substract');};
  btnDivide.onclick   = function() {compute('divide');};
  btnEqual.onclick    = function() {equal();};
  btnhelp.onmouseover    = function() {showHelp();};
  btnhelp.onmouseout     = function() {hiddenHelp();};
}

// document.onkeydown=function(event){
//      e = event window.event arguments.callee.caller.arguments[0];
//   if(e && e.keyCode == 27){ 
//  
//   }
// };

setTimeout("fullInitialize()", 1000);

activeBtn();