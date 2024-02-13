#!/usr/bin/env node
"use strict"; 

//Выводит в консоль значение текущей даты
function getCurrentDate (argv) {
    
    //обрабатываем полученные аргументы
    let currentDate = new Date();
    let wasParam = false;
    if  (argv.hasOwnProperty('year')) {
        console.log(`Текущий год: ${currentDate.getFullYear().toString()}`);
        wasParam = true;
    }
    if(argv.hasOwnProperty('month')) {
        console.log(`Текущий месяц: ${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`);
        wasParam = true;
    }
    if(argv.hasOwnProperty('date')) {
        console.log(`Дата в календарном месяце: ${currentDate.toISOString().slice(0, 10)}`);
        wasParam = true;
    }

    if (!wasParam) {
    console.log(`Укажите один из параметров: -y/year, -m/month , -d/date.`);
    }
    
}
//Выводит в консоль увеличение/уменьшение даты
function getCheangeDate (argv, addOrSub) {
   
    //Получаем объект реализующий функционал изменения даты:
    const dateObject  = require('./official/official').changeDate(addOrSub);

    //Обрабатываем дату согласно переданным в консольном вызове аргументам:
    let wasParam = false;
    const mActions = ['year', 'month', 'date']; 
    for (let action of mActions) {

        if (argv.hasOwnProperty(action)) {
            
            if(isNaN(argv[action])) {  //Проверяем параметры: если пользователь укажет не числовой параметр для года, месяца или даты сообщим ему об ошибочном вводе.
                console.log(`Неверно задан параметр ${action}`);
                return;
            }
            dateObject.valueOnChange = argv[action];
            dateObject[action]();
            wasParam = true;
        }
    }

    if (wasParam) {
        //Выводим результат в консоль
        console.log(`Дата: ${dateObject.currentDate.toISOString().slice(0, 10)}`);
    }
    else {
        console.log('Укажите хотябы один из параметров: -y/year, -m/month , -d/date.');
    }
}

//Для получения агрументов консольного вызова в виде объекта используем библиотеку yargs
const yargs = require('yargs/yargs')
const hideBin  = require('yargs/helpers').hideBin;

//Описываем настройки агрументов командной строки: 
const argv = yargs(hideBin(process.argv))
.option('action', { //создаем альясы для запланированных действий:
    alias: "a", 
    description: "Действие с датой current, add, sub.",
    choices: ['current', 'add', 'sub']
    })
.option('year', { 
   alias: "y",
   description: "Уear in ISO format.",
   type: "number",
   })
.option('month', {
   alias: "m",
   description: "Month in ISO format.",
   type: "number",
   })
.option('date', {
   alias: "d",
   description: "Data in ISO format.",
   type: "number",
   })
.alias('help', 'h') //Добавим альяс для help
.argv;

//Обрабатываем переданные аргументы
const nameParam = 'action';
if  (argv.hasOwnProperty(nameParam)) {

    switch (true) {
        case argv[nameParam] === 'current':
            getCurrentDate (argv);
            break;

        case argv[nameParam] === 'add':
            getCheangeDate (argv, argv[nameParam]);
            break;

        case argv[nameParam] === 'sub':
            getCheangeDate (argv, argv[nameParam]);
            break;
    }

}
