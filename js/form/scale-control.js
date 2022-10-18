import {form, photoPreview} from './selection.js';

const scaleControl = {
  reduce: form.querySelector('.scale__control--smaller'),
  add: form.querySelector('.scale__control--bigger'),
  inputValue: form.querySelector('.scale__control--value'),
  changeStepValue: 25,
  defaultValue: 100,
  minValue: 25,
  maxValue: 100,
  setDefaultValue: function() {
    this.inputValue.value = `${this.defaultValue}%`;
  },
  addValue: function() {
    let currentValue = Number((this.inputValue.value).slice(0, -1));

    if (currentValue >= this.minValue && currentValue < this.maxValue) {
      this.inputValue.value = `${currentValue + this.changeStepValue}%`;
    }
    currentValue = Number((this.inputValue.value).slice(0, -1));
    photoPreview.style.transform = `scale(${currentValue / 100})`;
  },
  reduceValue: function() {
    let currentValue = Number((this.inputValue.value).slice(0, -1));

    if (currentValue > this.minValue && currentValue <= this.maxValue) {
      this.inputValue.value = `${currentValue - this.changeStepValue}%`;
    }
    currentValue = Number((this.inputValue.value).slice(0, -1));
    photoPreview.style.transform = `scale(${currentValue / 100})`;
  }
};

export {scaleControl};
