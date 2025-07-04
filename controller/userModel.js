// userModel.js

const mongoose = require('mongoose');

// Schema untuk Pengguna
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email harus unik
    password: { type: String, required: true } // Di PRODUKSI, ini HARUS di-hash (bcrypt)
});

// Anda bisa menambahkan middleware Mongoose di sini untuk hashing password sebelum disimpan
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

module.exports = mongoose.model('User', userSchema);