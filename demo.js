var fs = require('fs');
var path = require('path');
var kkcoin = require('./rest.js');
var http = require('http');
var url = require('url');
const _ = require('lodash');

var api_key = ''; //api-key，在kkcoin上填入rsa公钥后获得
var secretFile = path.join(__dirname, 'storage/yourprivate.key');
var api_sec = fs.readFileSync(secretFile);
var api_sec_passphrase = '';
var kkcoin_config = {
    key: api_key,
    secret: api_sec,
    passphrase: api_sec_passphrase
}
var kk_rest = new kkcoin(kkcoin_config);

var asset = 'KK';
var currency = 'ETH';
var order_op = 'SELL';
var price = 0.1;
var amount = 1000;
var orderid = " ";

// kk_rest.trade(asset, currency, order_op, price, amount, function (err, ret) {
//     console.log(err, ret);
// })

// kk_rest.order(orderid, function (err, ret) {
//     console.log(err, ret);
// })

kk_rest.balance(function (err, ret) {
    console.log(err, ret);
})

kk_rest.order(orderid, function (err, ret) {
    console.log(err, ret);
})

kk_rest.cancel(orderid, function (err, ret) {
    console.log(err, ret);
})

// kk_rest.openorders(asset, currency, function (err, ret) {
//     console.log(err, ret);
// })

// kk_rest.allticker(function (err, ret) {
//     console.log(err, ret);
// })

// kk_rest.trades(asset, currency, function (err, ret) {
//     console.log(err, ret);
// })

// var timesRun = 0;
// var t1 = new Date().getTime();
// var interval = setInterval(function () {
//     timesRun += 1;
//     if (timesRun == 100) {
//         clearInterval(interval);
//         console.log((new Date().getTime()) - t1);
//     }
//     console.log(timesRun);
//     kk_rest.book(asset, currency, function (err, ret) {
//         var jsonObj = JSON.parse(ret);
//         var tempb = jsonObj.b.reverse();
//         var ask = _.chunk(jsonObj.a, 5)[0];
//         var bid = _.chunk(tempb, 5)[0];
//         console.log("     " + "价格" + "(" + currency + ")" + "     " + "数量" + "(" + asset + ")" + "     " + "金额" + "(" + currency + ")");
//         for (var i = 0; i < 5; i++) {
//             ask[i].push(ask[i][0] * ask[i][1]);
//         }
//         console.log(ask);
//         console.log("---------------------------------------------");
//         for (var i = 0; i < 5; i++) {
//             bid[i].push(bid[i][0] * bid[i][1]);
//         }
//         console.log(bid);
//     })
// }, 600);