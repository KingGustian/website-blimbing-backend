// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const protect = async (req, res, next) => {
    let token;

    // Cek apakah header Authorization ada dan dimulai dengan 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Ambil token dari header (Contoh: "Bearer eyJhbGci...")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verifikasi token menggunakan secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Ambil data pengguna dari ID di dalam token (tanpa password)
            // dan lampirkan ke objek request agar bisa digunakan di rute selanjutnya
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Lanjutkan ke controller selanjutnya
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
    }
};

module.exports = { protect };