// routes/articleRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controller/articleController');

// Impor middleware 'protect'
const { protect } = require('../middleware/authMiddleware');

// === Rute Publik (Siapa saja bisa akses) ===
router.route('/').get(getAllArticles);
router.route('/:id').get(getArticleById);

// === Rute Terlindungi (Hanya pengguna yang sudah login bisa akses) ===
// Terapkan middleware 'protect' sebelum controllernya
router.route('/').post(createArticle);
router.route('/:id').put(updateArticle);
router.route('/:id').delete(deleteArticle);

module.exports = router;