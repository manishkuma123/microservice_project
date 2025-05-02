const mongoose = require('mongoose');
const crypto = require('crypto');
const { encrypt, decrypt } = require('../ecryptoUtils');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  emailHash: { type: String, unique: true }, 
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });


userSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.emailHash = crypto.createHash('sha256').update(this.email).digest('hex');
    this.email = encrypt(this.email);
  }

  if (this.isModified('username')) {
    this.username = encrypt(this.username);
  }

  next();
});


userSchema.post('init', function (doc) {
  if (doc.email) doc.email = decrypt(doc.email);
  if (doc.username) doc.username = decrypt(doc.username);
});

module.exports = mongoose.model('User', userSchema);
