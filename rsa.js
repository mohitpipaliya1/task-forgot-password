const NodeRSA = require('node-rsa');



const key = new NodeRSA({b: 512});
 
const text = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ3NDRhZTNjNWE0NjMxMGNjNWU0MDgiLCJpYXQiOjE2MTUyODQ3MDh9.AWVtIjCAxssdCBFJ-O2BDahTdUHtosCS8BbWid3CpXE';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);
