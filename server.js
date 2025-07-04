// server.js (Versi Final yang Rapi)

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Impor file rute
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Mengizinkan akses dari domain lain
app.use(express.json()); // Mem-parsing body request menjadi JSON

// Koneksi ke Database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Berhasil terhubung ke MongoDB!'))
    .catch(err => console.error('❌ Gagal terhubung ke MongoDB:', err));

// Middleware untuk Rute
// Semua rute yang didefinisikan di articleRoutes akan memiliki awalan /api/articles
app.use('/api/articles', articleRoutes);

// Semua rute yang didefinisikan di userRoutes akan memiliki awalan /api/users
app.use('/api/users', userRoutes);


// Jalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});