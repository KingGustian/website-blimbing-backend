// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Perbaiki path ini untuk menunjuk ke folder 'routes'
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke Database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Berhasil terhubung ke MongoDB!'))
    .catch(err => console.error('❌ Gagal terhubung ke MongoDB:', err));

// Middleware untuk Rute
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes); // Path ini sekarang benar karena file userRoutes ada di dalam folder routes

// Jalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});