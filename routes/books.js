const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBookById,
  deleteBookById,
} = require('../controllers/booksControllers');

router.route('/').get(getAllBooks).post(verifyTokenAndAdmin, createNewBook);

router
  .route('/:id')
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBookById)
  .delete(verifyTokenAndAdmin, deleteBookById);

module.exports = router;
