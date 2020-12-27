var CryptoJS = require('crypto-js');
const secret = 'asld;asdf';

const encrypt = (data) => {
  var encrypted = CryptoJS.AES.encrypt(data, secret);
  return encrypted.toString();
};
const decrypt = (encrypted) => {
  var decrypted = CryptoJS.AES.decrypt(encrypted, secret);
  var object = decrypted.toString(CryptoJS.enc.Utf8);
  return object;
};

module.exports = {
  encrypt,
  decrypt,
};
