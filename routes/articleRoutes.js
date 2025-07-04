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

// Rute untuk mendapatkan semua artikel dan membuat artikel baru
router.route('/')
    .get(getAllArticles)
    .post(createArticle);

// Rute untuk mendapatkan, mengupdate, dan menghapus satu artikel berdasarkan ID
router.route('/:id')
    .get(getArticleById)
    .put(updateArticle)
    .delete(deleteArticle);

module.exports = router;