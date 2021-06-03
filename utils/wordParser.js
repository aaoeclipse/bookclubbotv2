const { prefix } = require('../config.json');


module.exports = (sentence) =>{
    const args = sentence.slice(prefix.length).trim().split(' ');
    const inputState = args.shift().toLowerCase();
    return args
}