const express = require('express');
const CryptoJS = require('crypto-js');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const USERS = {
  'user@example.com': {
    hashedPassword: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' //password
  }
};

const SECRET_KEY = 'minhaChaveSecreta123';

app.post('/login', (req, res) => {
  const { email, encryptedPassword } = req.body;
  const bytes  = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  if (email in USERS && verificaSenha(decryptedPassword, USERS[email].hashedPassword)) {
    res.json({ success: true, message: '🔓 Login bem-sucedido!' });
  } else {
    res.status(401).json({ success: false, message: '❌ Falha no login.' });
  }
});

function verificaSenha(decryptedPassword, userHashedPassword) {
  return CryptoJS.SHA256(decryptedPassword).toString() === userHashedPassword;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});