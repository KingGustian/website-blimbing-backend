// articleModel.js

const mongoose = require('mongoose');

// Schema untuk Artikel
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, default: () => new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
    image: { type: String, required: true },
    category: String,
    content: { type: String, required: true },
}, { timestamps: true }); // timestamps: true akan otomatis menambahkan createdAt dan updatedAt

module.exports = mongoose.model('Article', articleSchema);