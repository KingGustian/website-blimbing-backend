// model/articleModel.js

const mongoose = require('mongoose');

// Definisikan skema untuk koleksi artikel
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Judul artikel tidak boleh kosong'] // Pesan error kustom
    },
    author: {
        type: String,
        required: [true, 'Nama penulis tidak boleh kosong']
    },
    image: {
        type: String,
        required: [true, 'URL gambar tidak boleh kosong']
    },
    category: {
        type: String,
        required: [true, 'Kategori tidak boleh kosong']
    },
    content: {
        type: String,
        required: [true, 'Isi artikel tidak boleh kosong']
    }
}, {
    // timestamps akan secara otomatis menambahkan field createdAt dan updatedAt
    timestamps: true
});

// Ekspor model agar bisa digunakan di bagian lain dari aplikasi
module.exports = mongoose.model('Article', articleSchema);