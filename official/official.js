// TODO: Данный модуль содержит служебные процедуры и модуля проекта
"use strict"; 

// TODO: Изменяет текущую дату(date) на день/месяц/год в сторону увеличения/уменьшения(addOrSub) на переданную величину(valueOnChange)
const changeDate = (addOrSub) => {

   //Для обработки аргументов переданных в консольном вызове, будем использовать цикл, поэтому создадим объект с нужными методами работы с датой:
let dateObject = {
  currentDate:  new Date(),   //Дата для проведения вычислений, инициализируем текущей датой.
  valueOnChange: 0,           //значение на которое будем изменять дату.
  addOrSub: function (addOrSub) {     //1 - увеличиваем дату (add), -1 - уменьшаем дату(sub).    
    if (addOrSub == 'sub') {
      return -1;
    }
    return 1;
  }(addOrSub),
  year() {
    this.currentDate.setFullYear(this.currentDate.getFullYear()  + this.valueOnChange * this.addOrSub);
  },
  month() {
    this.currentDate.setMonth(this.currentDate.getMonth() + this.valueOnChange * this.addOrSub);
  },
  date() {
    this.currentDate.setDate(this.currentDate.getDate() + this.valueOnChange * this.addOrSub);
  }
  };
  return dateObject;
} ;

exports.changeDate = changeDate;
