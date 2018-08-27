const crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');
const host = 'api.kkcoin.com'

var Trader = function (config) {
    this.name = 'kkcoin';
    this.key = config.key;
    this.secret = config.secret;
    this.passphrase = config.passphrase;
}

Trader.prototype.sign = function (str) {
    var self = this;
    var signer = crypto.createSign('RSA-SHA256');
    return signer.update(str).sign({
        'key': self.secret,
        'passphrase': self.passphrase
    }, 'base64');
}

// Trader.prototype.allticker = function (callback) {
//     var self = this;
//     var api = '/rest/allticker'
//     var time_now = Math.floor(new Date().getTime() / 1000);
//     var payload = [];
//     var message = JSON.stringify(payload);
//     var signature = self.sign('allticker' + message + time_now);

//     const options = {
//         host: host,
//         path: api,
//         method: 'GET',
//         headers: {
//             'KKCOINAPIKEY': self.key,
//             'KKCOINSIGN': signature,
//             'KKCOINTIMESTAMP': time_now,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     const req = https.request(options, (res) => {
//         res.setEncoding('utf8');
//         var data = '';
//         res.on('data', (chunk) => {
//             //console.log(`BODY: ${chunk}`);
//             data += chunk;
//         });
//         res.on('end', () => {
//             callback(null, data);
//         });
//     });

//     req.on('error', (e) => {
//         //console.error(`problem with request: ${e.message}`);
//         callback(e.message, null);
//     });
//     req.end();
// }

// Trader.prototype.trades = function (asset, currency, callback) {
//     var self = this;
//     var api = '/rest/trades?symbol=' + asset + "_" + currency;
//     var time_now = Math.floor(new Date().getTime() / 1000);
//     var payload = [];
//     var message = JSON.stringify(payload);
//     var signature = self.sign('trades' + message + time_now);

//     const options = {
//         host: host,
//         path: api,
//         method: 'GET',
//         headers: {
//             'KKCOINAPIKEY': self.key,
//             'KKCOINSIGN': signature,
//             'KKCOINTIMESTAMP': time_now,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     const req = https.request(options, (res) => {
//         res.setEncoding('utf8');
//         var data = '';
//         res.on('data', (chunk) => {
//             //console.log(`BODY: ${chunk}`);
//             data += chunk;
//         });
//         res.on('end', () => {
//             callback(null, data);
//         });
//     });

//     req.on('error', (e) => {
//         //console.error(`problem with request: ${e.message}`);
//         callback(e.message, null);
//     });
//     req.end();
// }

// Trader.prototype.book = function (asset, currency, callback) {
//     var self = this;
//     var api = '/rest/book?symbol=' + asset + "_" + currency;
//     var time_now = Math.floor(new Date().getTime() / 1000);
//     var payload = [];
//     var message = JSON.stringify(payload);
//     var signature = self.sign('book' + message + time_now);

//     const options = {
//         host: host,
//         path: api,
//         method: 'GET',
//         headers: {
//             'KKCOINAPIKEY': self.key,
//             'KKCOINSIGN': signature,
//             'KKCOINTIMESTAMP': time_now,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     const req = https.request(options, (res) => {
//         res.setEncoding('utf8');
//         var data = '';
//         res.on('data', (chunk) => {
//             //console.log(`BODY: ${chunk}`);
//             data += chunk;
//         });
//         res.on('end', () => {
//             callback(null, data);
//         });
//     });

//     req.on('error', (e) => {
//         //console.error(`problem with request: ${e.message}`);
//         callback(e.message, null);
//     });
//     req.end();
// }

Trader.prototype.trade = function (asset, currency, orderop, price, amount, callback) {
    var self = this;
    var api = '/rest/trade'
    var time_now = Math.floor(new Date().getTime() / 1000);
    if (orderop != 'BUY' && orderop != 'SELL') {
        cb('orderop error');
    } else {
        var payload = {
            amount: String(amount),
            orderop: String(orderop),
            ordertype: "LIMIT",
            price: String(price),
            symbol: asset + '_' + currency
        };
        var message = JSON.stringify(payload);
        var signature = self.sign('trade' + message + time_now);

        const options = {
            host: host,
            path: api,
            method: 'POST',
            headers: {
                'KKCOINAPIKEY': self.key,
                'KKCOINSIGN': signature,
                'KKCOINTIMESTAMP': time_now,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                //console.log(`BODY: ${chunk}`);
                callback(null, chunk);
            });
            res.on('end', () => {});
        });

        req.on('error', (e) => {
            //console.error(`problem with request: ${e.message}`);
            callback(e.message, null);
        });

        var params = querystring.stringify(payload);
        req.write(params);
        req.end();
    }
}

Trader.prototype.balance = function (callback) {
    var self = this;
    var api = '/rest/balance'
    var time_now = Math.floor(new Date().getTime() / 1000);
    var payload = [];
    var message = JSON.stringify(payload);
    var signature = self.sign('balance' + message + time_now);

    const options = {
        host: host,
        path: api,
        method: 'GET',
        headers: {
            'KKCOINAPIKEY': self.key,
            'KKCOINSIGN': signature,
            'KKCOINTIMESTAMP': time_now,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', (chunk) => {
            //console.log(`BODY: ${chunk}`);
            data += chunk;
        });
        res.on('end', () => {
            callback(null, data);
        });
    });

    req.on('error', (e) => {
        //console.error(`problem with request: ${e.message}`);
        callback(e.message, null);
    });
    req.end();
}

// Trader.prototype.openorders = function (asset, currency, callback) {
//     var self = this;
//     var api = '/rest/openorders?symbol=' + asset + "_" + currency;
//     var time_now = Math.floor(new Date().getTime() / 1000);
//     var payload = [];
//     var message = JSON.stringify(payload);
//     var signature = self.sign('openorders' + message + time_now);

//     const options = {
//         host: host,
//         path: api,
//         method: 'GET',
//         headers: {
//             'KKCOINAPIKEY': self.key,
//             'KKCOINSIGN': signature,
//             'KKCOINTIMESTAMP': time_now,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     const req = https.request(options, (res) => {
//         res.setEncoding('utf8');
//         var data = '';
//         res.on('data', (chunk) => {
//             //console.log(`BODY: ${chunk}`);
//             data += chunk;
//         });
//         res.on('end', () => {
//             callback(null, data);
//         });
//     });

//     req.on('error', (e) => {
//         //console.error(`problem with request: ${e.message}`);
//         callback(e.message, null);
//     });
//     req.end();
// }

Trader.prototype.order = function (orderid, callback) {
    var self = this;
    var api = '/rest/order?id=' + orderid;
    var time_now = Math.floor(new Date().getTime() / 1000);
    var payload = [];
    var message = JSON.stringify(payload);
    var signature = self.sign('order' + message + time_now);

    const options = {
        host: host,
        path: api,
        method: 'GET',
        headers: {
            'KKCOINAPIKEY': self.key,
            'KKCOINSIGN': signature,
            'KKCOINTIMESTAMP': time_now,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', (chunk) => {
            //console.log(`BODY: ${chunk}`);
            data += chunk;
        });
        res.on('end', () => {
            callback(null, data);
        });
    });

    req.on('error', (e) => {
        //console.error(`problem with request: ${e.message}`);
        callback(e.message, null);
    });
    req.end();
}

Trader.prototype.cancel = function (orderid, callback) {
    var self = this;
    var api = '/rest/cancel';
    var time_now = Math.floor(new Date().getTime() / 1000);
    var payload = {
        id: String(orderid)
    };
    var message = JSON.stringify(payload);
    var signature = self.sign('cancel' + message + time_now);

    const options = {
        host: host,
        path: api,
        method: 'POST',
        headers: {
            'KKCOINAPIKEY': self.key,
            'KKCOINSIGN': signature,
            'KKCOINTIMESTAMP': time_now,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', (chunk) => {
            //console.log(`BODY: ${chunk}`);
            data += chunk;
        });
        res.on('end', () => {
            callback(null, data);
        });
    });

    req.on('error', (e) => {
        //console.error(`problem with request: ${e.message}`);
        callback(e.message, null);
    });
    req.end();
}

module.exports = Trader;