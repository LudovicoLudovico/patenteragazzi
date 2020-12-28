var CryptoJS = require('crypto-js');
const secret = 'asld;asdasfasdfadf';

const encrypt = (data) => {
  var encrypted = CryptoJS.Rabbit.encrypt(data, secret);
  return encrypted.toString();
};
const decrypt = (encrypted) => {
  var decrypted = CryptoJS.Rabbit.decrypt(encrypted, secret);
  var object = decrypted.toString(CryptoJS.enc.Utf8);
  return object;
};

module.exports = {
  encrypt,
  decrypt,
};
