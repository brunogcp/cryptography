<div align="center">
  <h3 align="center">Cryptography</h3>
  <div>
  <a href="https://bgcp.vercel.app/article/893ea41c-615e-48e3-93e4-c5115a01a7a7">
  <img src="https://img.shields.io/badge/Download PDF (ENGLISH)-black?style=for-the-badge&logoColor=white&color=000000" alt="three.js" />
  </a>
  </div>
</div>

## 🚀 Introdução ao Hashing e Criptografia

Neste tutorial, exploraremos os conceitos básicos de hashing e criptografia, técnicas essenciais para garantir a segurança e a integridade dos dados em suas aplicações Node.js. Entender esses conceitos é fundamental para desenvolver sistemas seguros que protejam informações sensíveis e garantam que dados transmitidos ou armazenados não sejam comprometidos.

### 🌟 Principais Características:

- **Hashing**:
  - **🔒 Integridade de Dados**: Garante que os dados não foram alterados, utilizando uma função hash para gerar um valor único baseado no conteúdo original.
  - **🛑 Armazenamento Seguro de Senhas**: Armazena senhas de forma segura, impedindo que sejam expostas mesmo em caso de acesso não autorizado aos dados armazenados.

- **Criptografia**:
  - **🔐 Confidencialidade**: Assegura que somente pessoas ou sistemas autorizados possam acessar as informações.
  - **🔑 Autenticação e Não Repúdio**: Confirma a identidade das partes envolvidas na comunicação e garante que uma parte não possa negar a autoria de uma mensagem.

## 🛠️ Instalação

### Windows, Linux (Ubuntu/Debian), e macOS:

Para seguir este tutorial, você precisará ter o Node.js e o NPM (Node Package Manager) instalados. Usaremos a biblioteca `crypto`, que já vem embutida no Node.js, sem necessidade de instalação adicional.

## 📊 Uso Básico

### Configuração Inicial:

O módulo `crypto` do Node.js oferece uma série de funcionalidades criptográficas, incluindo suporte para criptografia e hashing. Vamos começar com um exemplo básico de como usar hashing e criptografia para proteger informações.

1. **Hashing de uma Senha**:

Crie um arquivo `hashing.js`:

```js
const crypto = require('crypto');

// Hashing de uma senha
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

console.log(hashPassword('minhasenha123')); // Exemplo de uso
```

2. **Criptografia Simétrica**:

Crie um arquivo `criptografia.js`:

```js
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
```

## 📈 Uso de Hashing e Criptografia para Melhoria de Segurança

### Teoria:

💡 O uso de hashing e criptografia é crucial para proteger informações sensíveis e assegurar a segurança das comunicações entre cliente e servidor. O hashing é ideal para verificar a integridade dos dados e armazenar senhas de forma segura. Já a criptografia protege os dados sensíveis durante sua transmissão ou armazenamento.

### Motivo para Utilizar:

🚀 Implementar essas técnicas eleva a segurança da aplicação, protegendo-a contra vazamentos de dados, ataques de força bruta e interceptações não autorizadas.

### 👨‍💻 Implementação Prática:

#### Backend: Descriptografia e Verificação de Senha

1. **Configuração do Servidor Node.js**:
   - Instale as dependências necessárias:
     ```bash
     npm install express crypto-js cors
     ```

2. **Criação do Servidor** (`server.js`):
   - Implemente a lógica para descriptografar a senha recebida e verificar a senha com a versão hash armazenada (para simplificação, estamos usando uma senha mockada e hash diretamente no código):
 ```js
 const express = require('express');
 const bodyParser = require('body-parser');
 const CryptoJS = require('crypto-js');

 const app = express();
 app.use(bodyParser.json());

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
 ```

#### Frontend: Criptografia de Senha com React

1. **Criação do Componente de Login** (`Login.js`):
   - Utilize React para criar um componente de formulário de login que criptografe a senha antes de enviá-la ao servidor: instalar o crypto-js `npm install crypto-js`:
 ```jsx
 import React, { useState } from 'react';
 import CryptoJS from 'crypto-js';

 function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

   const handleSubmit = async (e) => {
	 e.preventDefault();

	 const encryptedPassword = CryptoJS.AES.encrypt(password, 'minhaChaveSecreta123').toString();

	 try {
	  const response = await fetch('http://localhost:3000/login', {
		 method: 'POST',
		 headers: {
		   'Content-Type': 'application/json',
		 },
		 body: JSON.stringify({ email, encryptedPassword }),
	   });

	   const data = await response.json();
	   setMessage(data.message);
	 } catch (error) {
	   console.error('Error:', error);
	   setMessage('❌ Erro ao tentar login.');
	 }
   };

   return (
	 <div>
	   <label style={{marginRight: '16px'}}>Email: user@example.com</label>
	   <label>Senha: password</label>
	   <form onSubmit={handleSubmit}>
		 <label>Email:</label>
		 <input
		   type="email"
		   value={email}
		   onChange={(e) => setEmail(e.target.value)}
		 />
		 <label>Senha:</label>
		 <input
		   type="password"
		   value={password}
		   onChange={(e) => setPassword(e.target.value)}
		 />
		 <button type="submit">Login</button>
	   </form>
	   {message && <p>{message}</p>}
	 </div>
   );
 }

 export default Login;
 ```

### Configuração Avançada do Hashing e Criptografia:

- **🔒 Utilize Salts no Hashing**: Adicione um valor aleatório único, conhecido como salt, ao processo de hashing para aumentar a segurança.
- **🔏 Criptografia Assimétrica para Comunicação Segura**: Use criptografia assimétrica para a troca segura de chaves de criptografia entre o cliente e o servidor.

### 🔍 Testes

#### 1. Testar a Segurança do Processo de Login:

- Verifique a segurança do processo de login, criptografando a senha no cliente e assegurando que a senha descriptografadas no servidor corresponde à versão hash armazenada.

#### 2. Avaliar a Resistência contra Interceptação:

- Teste a resistência do sistema contra interceptações, garantindo que a senha criptografada não possa ser utilizada sem a devida descriptografia no servidor.

## 🏆 Conclusão

A implementação correta de hashing e criptografia é fundamental para a segurança de qualquer aplicação Node.js. Ao garantir a integridade e a confidencialidade dos dados, você protege não apenas sua aplicação mas também os usuários que confiam em você com suas informações sensíveis.  Continuar explorando e implementando práticas de segurança robustas é fundamental para manter suas aplicações e dados dos usuários seguros contra ameaças.