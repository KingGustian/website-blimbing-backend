// controllers/userController.js

// Pastikan path ini benar menunjuk ke file userModel.js Anda
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Anda harus mendefinisikan JWT_SECRET. Praktik terbaik adalah menyimpannya di file .env
// Contoh: const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = 'secret_key_yang_sangat_aman_dan_panjang';

// --- Fungsi untuk pendaftaran pengguna baru ---
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validasi input dasar
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    try {
        // 1. Cek apakah email sudah terdaftar
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // 2. Buat instance user baru
        user = new User({
            name,
            email,
            password,
        });

        // 3. Hash kata sandi sebelum disimpan
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Simpan pengguna ke database
        await user.save();

        // Kirim respons sukses
        res.status(201).json({ 
            message: 'Registrasi berhasil',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// --- Fungsi untuk login pengguna ---
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan kata sandi wajib diisi' });
    }

    try {
        // 1. Cek pengguna berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email atau kata sandi salah' });
        }

        // 2. Bandingkan kata sandi yang diberikan dengan hash di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau kata sandi salah' });
        }

        // 3. Buat payload untuk JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        // 4. Buat dan tandatangani token JWT
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '5h' }, // Token berlaku selama 5 jam
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    message: 'Login berhasil',
                    token,
                    name: user.name // Mengirim nama untuk ditampilkan di frontend
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}; 