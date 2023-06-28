const express = require('express');
const router = express.Router();
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  resetThePassword,
  getResetPasswordView,
} = require('../controllers/passwordController');

router
  .route('/forgot-password')
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

router
  .route('/reset-password/:userId/:token')
  .get(getResetPasswordView)
  .post(resetThePassword);

module.exports = router;
