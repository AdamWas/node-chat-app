const moment = require('moment');

moment.updateLocale('pl', {
    months : [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec",
        "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ]
});

moment.updateLocale('pl', {
    monthsShort : [
        "Sty", "Lut", "Mar", "Kwi", "Maj", "Cze",
        "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"
    ]
});

var date = moment();
var date2 = moment();
date2.subtract(20, 'hours')

console.log(date.format('DD MMMM YYYY'));
date.subtract(2, 'months');
console.log(date.format('DD MMMM YYYY'));
console.log(date.format('hh:mm A'));
console.log(date2.format('h:mm A'));
console.log(date.format('HH:mm'));
// console.log(date.format('DD-MMM-YYYY A'));

var customDate = 1241251211111;
var standardDate = moment(customDate);

console.log(standardDate.format());
