import redis from 'redis';
// var redis = require('redis');

let client = redis.createClient(6379, '127.0.0.1');

let lpush = function (key, value) {
    return new Promise((resolve, reject) => {
        client
            .multi()
            .select(0)
            .lpush(key, value)
            .expire(key, 10)
            .exec((error, result) => {
                if (error) return reject(error);
                else return resolve(result);
            });
    });
};



let call = async function (key, value) {
    let result = await lpush(key, value);
    return result;
    // process.exit(1);
};
let b = async function (key, value) {
    return await call(key, value);
}
// call('t', 123);
// lpush('t', 123)
// .then(val=>{
//     console.log(val)
// })
exports.lpush = b;