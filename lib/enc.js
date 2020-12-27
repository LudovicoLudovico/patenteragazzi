// const crypto = require('crypto');

// const algorithm = 'aes-256-ctr';
// const secretKey = 'ajdf20451234j5l;fn;lsndfsadf0qer';
// const iv = crypto.randomBytes(16);

// const encrypt = (text) => {
//   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

//   const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

//   return {
//     iv: iv.toString('hex'),
//     content: encrypted.toString('hex'),
//   };
// };

// const decrypt = (iv, content) => {
//   const decipher = crypto.createDecipheriv(
//     algorithm,
//     secretKey,
//     Buffer.from(iv, 'hex')
//   );

//   const decrpyted = Buffer.concat([
//     decipher.update(Buffer.from(content, 'hex')),
//     decipher.final(),
//   ]);

//   return decrpyted.toString();
// };

// module.exports = {
//   encrypt,
//   decrypt,
// };

var CryptoJS = require('crypto-js');
const secret = 'asld;fjkadfaerq34oir';

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

// var CryptoJS = require('crypto-js');
// var data = JSON.stringify({ abc: 'xyz' });

// var encrypted = CryptoJS.AES.encrypt(data, 'my-secret');
// console.log(encrypted.toString());

// var decrypted = CryptoJS.AES.decrypt(encrypted, 'my-secret');
// var object = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
// console.log(object);
// console.log(object.abc);
