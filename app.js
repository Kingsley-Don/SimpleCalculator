var result   = document.getElementsByClassName('result')[0],
    btns     = document.getElementsByClassName('btns')[0],
    number   = document.getElementsByClassName('number'),
    symbols  = document.getElementsByClassName('symbol'),
    btnDot   = document.getElementsByClassName('dot')[0],
    help     = document.getElementsByClassName('help'),
    btnhelp  = document.getElementById('helpbtn'),

    checkResult = true,
    checkSymbol = true,
    checkEqual  = true,
    
    btnAdd   = symbols[4],
    btnSub   = symbols[2],
    btnMul   = symbols[1],
    btnDiv   = symbols[0],
    btnEqual = symbols[3],

    a;

function initialize() {
  a = '';
  checkResult = true,
  checkSymbol = true,
  checkEqual  = true,
  result.innerHTML = '0';
}

function showHelp() {
  result.style.filter   = 'blur(10px) opacity(0.3) grayscale(0.3)';
  btns.style.filter     = 'blur(10px) opacity(0.3) grayscale(0.3)';
  help[0].style.opacity = '1';
  help[1].style.opacity = '1';
}

function hiddenHelp() {
  result.style.filter   = 'initial';
  btns.style.filter     = 'initial';
  help[0].style.opacity = '0';
  help[1].style.opacity = '0';
}

function insertNumber(number) {
  if (!checkEqual) {
    a = '';
  }
  checkSymbol = true;
  if (result.innerHTML == '0' || checkResult) {
    result.innerHTML = '';
  } 
  if (result.innerHTML.length < 11) {
    result.insertAdjacentHTML('beforeend', number);
  }
  a += number;
  checkResult = false;
  checkEqual = true;
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
  if (!checkEqual) {
    a = '';
  }
  if (checkResult || !checkSymbol) {
    result.innerHTML = '0';
    a += '.';
    result.insertAdjacentHTML('beforeend', '.');
  } else if (checkDot(result.innerHTML, 9)) {
    a += '.';
    result.insertAdjacentHTML('beforeend', '.');
  }
  checkResult = false;
}

function writeResult() {
  result.innerHTML = '';
  if (a == 'Infinity') {
    result.innerHTML = 'MATH ERROR';
  } else if (String(a).length > 11) {
    if (Number(a) > 99999999999) {
      result.innerHTML = 'MAX LENGTH';
    } else if (String(a)[10] == '.') {
      for (var i = 0; i < 10; i++) {
        result.insertAdjacentHTML('beforeend', String(a)[i]);
      }
    } else {
      for (var i = 0; i < 11; i++) {
        result.insertAdjacentHTML('beforeend', String(a)[i]);
      }
    }
  } else {
    for (var j = 0; j < String(a).length; j++) {
      result.insertAdjacentHTML('beforeend', String(a)[j]);
    }
  }
}

function insertSymbol(symbol) {
  if (checkSymbol) {
    a = eval(a);
    writeResult();
    switch (symbol){
      case 'add':
        a += '+';
        break;
      case 'sub':
        a += '-';
        break;
      case 'mul':
        a += '*';
        break;
      case 'div':
        a += '/';
        break;
    }
    checkSymbol = false;
    checkResult = true;
    checkEqual = true;
  }
}

function equal() {
  if (checkEqual) {
    a = eval(a);
    writeResult();
    checkSymbol = true;
    checkResult = true;
  }
  checkEqual = false;
}

function activeBtn() {
  for (i in number) {
    number[i].onclick = function() {insertNumber(this.innerHTML);};
  }
  result.onclick         = function() {initialize();}
  btnAdd.onclick         = function() {insertSymbol('add');}
  btnSub.onclick         = function() {insertSymbol('sub');}
  btnMul.onclick         = function() {insertSymbol('mul');}
  btnDiv.onclick         = function() {insertSymbol('div');}
  btnDot.onclick         = function() {insertDot();}
  btnEqual.onclick       = function() {equal();}
  btnhelp.onmouseover    = function() {showHelp();}
  btnhelp.onmouseout     = function() {hiddenHelp();}
}

setTimeout('initialize();', 1000);
activeBtn();