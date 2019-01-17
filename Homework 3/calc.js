//TODO: figure out when to reset operation and input
'use strict';

var result = null;
var input = null;
var operation = '';
var display = '';

var equalsClicked = false;
var lastInput = null;
var lastOperation = '';

$('.digitButton').click(function () {
  equalsClicked = false;
  if (operation == '') {
    result = null;
  }
  if (display == '0') {
    display = '';
  }
  display = display.concat($(this).val());
  input = Number(display);
  $('#display').val(display);
  console.log('DIG/ result: ' + result + ', input: ' + input +
    ', operation: ' + operation + ', display: ' + display +
    ', lastInput: ' + lastInput + ', lastOperation: ' + lastOperation +
    ', equalsClicked: ' + equalsClicked);
});

$('.operationButton').click(function () {
  equalsClicked = false;
  if (display != '') {
    equals(input, operation);
  }
  input = null;
  operation = $(this).attr('name');
  console.log('OPE/ result: ' + result + ', input: ' + input +
    ', operation: ' + operation + ', display: ' + display +
    ', lastInput: ' + lastInput + ', lastOperation: ' + lastOperation +
    ', equalsClicked: ' + equalsClicked);
});

$('#equalsButton').click(function () {
  if (equalsClicked && lastInput != null && lastOperation != '') {
    equals(lastInput, lastOperation);
  } else if (input != null) {
    equals(input, operation);
    equalsClicked = true;
  }
  input = null;
  operation = '';
  console.log('EQB/ result: ' + result + ', input: ' + input +
    ', operation: ' + operation + ', display: ' + display +
    ', lastInput: ' + lastInput + ', lastOperation: ' + lastOperation +
    ', equalsClicked: ' + equalsClicked);
});

$('#clearButton').click(function () {
  equalsClicked = false;
  result = null;
  input = null;
  lastInput = null;
  operation = '';
  lastOperation = '';
  display = '';
  $('#display').val(display);
  console.log('CLE/ result: ' + result + ', input: ' + input +
    ', operation: ' + operation + ', display: ' + display +
    ', lastInput: ' + lastInput + ', lastOperation: ' + lastOperation +
    ', equalsClicked: ' + equalsClicked);
});

function equals(input, operation) {
  if (result != null) {
    switch (operation) {
      case 'add':
        result += input;
        break;
      case 'subtract':
        result -= input;
        break;
      case 'multiply':
        result *= input;
        break;
      case 'divide':
        result /= input;
        break;
      default:
        // console.log('Operation unknown');
        break;
    }
  } else {
    result = input;
  }
  lastInput = input;
  lastOperation = operation;
  display = result.toString();
  $('#display').val(display);
  display = '';
  console.log('EQU/ result: ' + result + ', input: ' + window.input +
    ', operation: ' + window.operation + ', display: ' + display +
    ', lastInput: ' + lastInput + ', lastOperation: ' + lastOperation +
    ', equalsClicked: ' + equalsClicked);
}