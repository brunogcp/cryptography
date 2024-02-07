const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const password = 'senha secreta';
const key = crypto.scryptSync(password, 'salt', 32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(encrypted.iv, 'hex'));
  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const encrypted = encrypt('Texto secreto');
console.log(encrypted);
console.log(decrypt(encrypted));