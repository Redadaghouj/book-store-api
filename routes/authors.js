const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthorById,
  deleteAuthorById,
} = require('../controllers/authorsController');

// /api/authors
router.route('/').get(getAllAuthors).post(verifyTokenAndAdmin, createNewAuthor);

// /api/authors/:id
router
  .route('/:id')
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthorById)
  .delete(verifyTokenAndAdmin, deleteAuthorById);

module.exports = router;
