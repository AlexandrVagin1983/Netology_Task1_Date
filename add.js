#!/usr/bin/env node
"use strict"; 

//Для получения агрументов консольного вызова в виде объекта используем библиотеку yargs
const yargs = require('yargs/yargs')
const hideBin  = require('yargs/helpers').hideBin;
const argv = yargs(hideBin(process.argv))
.option('year', { //создаем альясы для запланированных действий:
   alias: "y",
   description: "Уear in ISO format.",
   type: "number",
   default: 0
   })
.option('month', {
   alias: "m",
   description: "Month in ISO format.",
   type: "number",
   default: 0
   })
.option('date', {
   alias: "d",
   description: "Data in ISO format.",
   type: "number",
   default: 0
   })
.alias('help', 'h') //Добавим альяс для help
.argv;

//Определим вид изменения даты (уменьшать/увеличивать):
let addOrSub = 'add';
const mPath = argv['$0'].split('\\');
if (mPath.length > 0 ) {
  if (mPath[mPath.length -1].includes('sub')) {
    addOrSub = 'sub'
  }
}

//Получаем объект реализующий функционал изменения даты:
const dateObject  = require('./official/official').changeDate(addOrSub);

//Обрабатываем дату согласно переданным в консольном вызове аргументам:
const mActions = ['year', 'month', 'date']; 
for (let action of mActions) {

  if (isNaN(argv[action])) {  //Проверяем параметры, по умолчанию yargs подставит 0, если пользователь укажет не числовой параметр для года, месяца или даты сообщим ему об ошибочном вводе.
    console.log(`Неверно задан параметр ${action}`);
    return;
  }
  dateObject.valueOnChange = argv[action];
  dateObject[action]();
  
}

//Выводим результат в консоль
console.log(`Дата: ${dateObject.currentDate.toISOString().slice(0, 10)}`);
