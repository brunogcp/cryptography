const crypto = require('crypto');

// Hashing de uma senha
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

console.log(hashPassword('minhasenha123')); // Exemplo de uso