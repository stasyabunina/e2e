export default class ValidationForm {
  constructor(element) {
    this.element = element;
    this.checked = false;
    this.checkedLuhn = false;
    this.card = null;
  }

  validate(value) {
    this.checkLuhn(value);

    if (this.checkLuhn(value) === true) {
      this.checkedLuhn = true;
    }

    if (/^\d+$/.test(value) && this.checkedLuhn === true) {
      if (/(^4)/.test(value) && [13, 16].includes(value.length)) {
        this.checked = true;
        this.card = 'visa';
      } else if (/(^5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(value) && value.length === 16) {
        this.checked = true;
        this.card = 'mastercard';
      } else if (/(^3[47])/.test(value) && value.length === 15) {
        this.checked = true;
        this.card = 'amex';
      } else if (/(^220(0|4))/.test(value) && [16, 17, 18, 19].includes(value.length)) {
        this.checked = true;
        this.card = 'mir';
      } else if ((/^(?:2131|1800)/.test(value) && value.length === 15) || (/(^35)/.test(value) && value.length === 16)) {
        this.checked = true;
        this.card = 'jcb';
      } else if (/(^6(?:011|5))/.test(value) && value.length === 16) {
        this.checked = true;
        this.card = 'discover';
      } else if (/^3(?:0[0-5]|[68])/.test(value) && value.length === 14) {
        this.checked = true;
        this.card = 'diners';
      }
    }

    const popup = document.querySelector('.popup');

    if (popup === null && this.checked === false) {
      const text = document.createElement('span');
      text.classList.add('popup');
      if (/^\d+$/.test(value) && this.checkedLuhn === true) {
        if (this.card === null) {
          text.textContent = 'Карта не пренадлежит ни одной из выше данных платежных систем.';
        }
      } else if (/^\d+$/.test(value) === false) {
        text.textContent = 'Карта не валидна: карта должна состоять только из цифр.';
      } else if (/^\d+$/.test(value) && this.checkedLuhn === false) {
        text.textContent = 'Карта не валидна: карта не прошла валидацию по алгоритму Луна.';
      }
      this.element.append(text);
      this.element.querySelector('.input-wrapper').style.marginBottom = '5px';
    } else if (popup !== null && this.checked === false) {
      if (/^\d+$/.test(value) && this.checkedLuhn === true) {
        if (this.card === null) {
          popup.textContent = 'Карта не пренадлежит ни одной из выше данных платежных систем.';
        }
      } else if (/^\d+$/.test(value) === false) {
        popup.textContent = 'Карта не валидна: карта должна состоять только из цифр.';
      } else if (/^\d+$/.test(value) && this.checkedLuhn === false) {
        popup.textContent = 'Карта не валидна: карта не прошла валидацию по алгоритму Луна.';
      }
    }

    if (popup !== null && this.checked === true) {
      popup.remove();
      this.element.querySelector('.input-wrapper').removeAttribute('style')
    }

    this.disable();

    this.checked = false;
    this.card = null;
    this.checkedLuhn = false;
  }

  disable() {
    const cards = Array.from(document.querySelectorAll('.card'));
    const unsuitableCards = cards.filter((card) => card.classList[1] !== this.card);

    unsuitableCards.forEach((card) => {
      card.style.filter = 'grayscale(1)';
    })

    const suitableCardArr = cards.filter((card) => card.classList[1] === this.card);

    if (suitableCardArr.length !== 0) {
      suitableCardArr[0].style.filter = 'grayscale(0)';
    }
  }

  checkLuhn(value) {
    if (value.length < 13) return false;
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
      let cardNum = parseInt(value[i], 10);

      if ((value.length - i) % 2 === 0) {
        cardNum *= 2;
        if (cardNum > 9) {
          cardNum -= 9;
        }
      }

      sum += cardNum;
    }

    return (sum !== 0) && (sum % 10 === 0);
  }
}
