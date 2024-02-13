#!/usr/bin/env node
"use strict"; 

//Для получения агрументов консольного вызова в виде объекта используем библиотеку yargs
const yargs = require('yargs/yargs')
const hideBin  = require('yargs/helpers').hideBin;

const argv = yargs(hideBin(process.argv))
.option('year', {
   alias: "y",
   description: "Current year in ISO format.",
   })
.option('month', {
   alias: "m",
   description: "Current month in ISO format.",
   })
.option('date', {
   alias: "d",
   description: "Current data in ISO format.",
   })
.alias('help', 'h') //Добавим альяс для help
.argv;

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
