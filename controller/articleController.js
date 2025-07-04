// controller/articleController.js

const Article = require('../model/articleModel');

// @desc    Menampilkan semua artikel
// @route   GET /api/articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data artikel", error: error.message });
    }
};

// @desc    Menampilkan satu artikel berdasarkan ID
// @route   GET /api/articles/:id
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Artikel tidak ditemukan" });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data artikel", error: error.message });
    }
};


// @desc    Membuat (tambah) artikel baru
// @route   POST /api/articles
exports.createArticle = async (req, res) => {
    try {
        const { title, author, image, category, content } = req.body;

        const newArticle = await Article.create({
            title,
            author,
            image,
            category,
            content
        });

        res.status(201).json({
            message: "Artikel berhasil ditambahkan",
            data: newArticle
        });
    } catch (error) {
        res.status(400).json({ message: "Data yang dikirim tidak valid", error: error.message });
    }
};

// @desc    Mengedit (update) artikel berdasarkan ID
// @route   PUT /api/articles/:id
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: "Artikel yang akan diupdate tidak ditemukan" });
        }

        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Mengembalikan dokumen yang sudah diupdate
            runValidators: true // Menjalankan validasi dari skema
        });

        res.status(200).json({
            message: "Artikel berhasil diperbarui",
            data: updatedArticle
        });
    } catch (error) {
        res.status(400).json({ message: "Gagal memperbarui artikel", error: error.message });
    }
};

// @desc    Menghapus artikel berdasarkan ID
// @route   DELETE /api/articles/:id
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: "Artikel yang akan dihapus tidak ditemukan" });
        }

        await Article.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Artikel berhasil dihapus", data: { id: req.params.id } });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus artikel", error: error.message });
    }
};