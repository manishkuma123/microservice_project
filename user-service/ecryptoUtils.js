
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const ENCRYPTION_SECRET = "12345678901234567890123456789012"; // 32-byte key
const key = Buffer.from(ENCRYPTION_SECRET, 'utf8');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// function decrypt(encryptedText) {
//   const [ivHex, encryptedData] = encryptedText.split(':');
//   const iv = Buffer.from(ivHex, 'hex');
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
//   let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }
function decrypt(encryptedText) {
  try {
    if (!encryptedText || typeof encryptedText !== 'string') {
      throw new Error('No encrypted text provided');
    }

    const [ivHex, encryptedData] = encryptedText.split(':');
    if (!ivHex || !encryptedData) {
      throw new Error('Malformed encrypted string');
    }

    const iv = Buffer.from(ivHex, 'hex');
    if (iv.length !== 16) {
      throw new Error('Invalid IV length');
    }

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;

  } catch (err) {
    console.error('Decryption error:', err.message);
    return null; // or return encryptedText to avoid data loss
  }
}


module.exports = { encrypt, decrypt };
