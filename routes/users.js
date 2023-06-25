const express = require('express');
const router = express.Router();
const {
  updateUserById,
  getAllUsers,
  getUserById,
  deleteUserById,
} = require('../controllers/userController');

router
  .route('/:id')
  .put(verifyTokenAndAuthorization, updateUserById)
  .get(verifyTokenAndAuthorization, getUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById);

router.route('/').get(verifyTokenAndAdmin, getAllUsers);

module.exports = router;
