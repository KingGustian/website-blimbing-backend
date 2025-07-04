// userController.js

const User = require('./userModel'); // Kita akan membuat file ini selanjutnya
// Jika Anda menginstal bcryptjs, uncomment baris ini
// const bcrypt = require('bcryptjs');

// Fungsi untuk pendaftaran pengguna baru
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // --- PENTING: UNTUK PRODUKSI, HASILKAN password di sini menggunakan bcrypt ---
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const newUser = new User({ name, email, password: hashedPassword });
        // ---

        // Untuk pengembangan awal tanpa hashing:
        const newUser = new User({ name, email, password });

        await newUser.save();
        res.status(201).json({ message: 'Pendaftaran berhasil! Silakan login.' });
    } catch (err) {
        if (err.code === 11000) { // Kode error MongoDB untuk duplikat key (email sudah terdaftar)
            return res.status(409).json({ message: 'Email sudah terdaftar.' });
        }
        res.status(400).json({ message: err.message });
    }
};

// Fungsi untuk login pengguna
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email atau kata sandi salah.' });
        }

        // --- PENTING: UNTUK PRODUKSI, BANDINGKAN password yang di-hash di sini ---
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) { ... }
        // ---

        // Untuk pengembangan awal tanpa hashing:
        if (password !== user.password) {
            return res.status(400).json({ message: 'Email atau kata sandi salah.' });
        }

        // Jika Anda menggunakan JWT (JSON Web Tokens), Anda akan membuat dan mengirim token di sini
        res.json({ message: 'Login berhasil!', user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};