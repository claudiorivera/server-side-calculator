export default class Calculation {
  constructor(firstValue, secondValue, operation) {
    this._firstValue = firstValue;
    this._secondValue = secondValue;
    this._operation = operation;
  }
  set firstValue(value) {
    this._firstValue = value;
  }
  set secondValue(value) {
    this._secondValue = value;
  }
  set operation(operation) {
    this._operation = operation;
  }
  json() {
    if (this.isReadyToCalculate()) {
      return `{"firstValue":"${this._firstValue}","secondValue":"${this._secondValue}","operation":"${this._operation}"}`;
    } else {
      return undefined;
    }
  }
  isReadyToOperate() {
    if (this._firstValue && !this._secondValue) {
      return true;
    } else {
      return false;
    }
  }
  isReadyToCalculate() {
    if (this._firstValue && this._secondValue && this._operation) {
      return true;
    } else {
      return false;
    }
  }
  resetAll() {
    this._firstValue = undefined;
    this._secondValue = undefined;
    this._operation = undefined;
  }
}
