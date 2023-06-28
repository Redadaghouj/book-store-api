const express = require('express');
const { getForgotPasswordView } = require('../controllers/passwordController');
const router = express.Router();

router.route('/forgot-password').get(getForgotPasswordView);

module.exports = router;
