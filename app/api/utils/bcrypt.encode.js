const bcrypt = require('bcrypt');
const saltRounds = process.env.saltRounds || 10;
const myPlaintextPassword = '';
const someOtherPlaintextPassword ='';
const hash='';

exports.bcryptHash = bcrypt.hash(myPlaintextPassword, saltRounds);

exports.bcryptCompare = bcrypt.compare(someOtherPlaintextPassword, hash)