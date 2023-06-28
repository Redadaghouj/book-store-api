const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
/**
 * @desc Get forgot password view
 * @route /password/forgot-password
 * @method GET
 * @access public
 */
const getForgotPasswordView = asyncHandler((req, res) => {
  res.render('forgot-password');
});

/**
 * @desc Send forgot password link
 * @route /password/forgot-password
 * @method POST
 * @access public
 */
const sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: 'user not found!' });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: '10m',
  });
  const link = `http://127.0.0.1:5000/password/reset-password/${user._id}/${token}`;
  res.json({ message: 'Click on the link', resetPasswordLink: link });

  // TODO: send link on email.
});

/**
 * @desc Get forgot password view
 * @route /password/reset-password/:userId/:token
 * @method GET
 * @access public
 */
const getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found!' });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render('reset-password', { email: user.email });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error' });
  }
});

/**
 * @desc Reset password
 * @route /password/reset-password/:userId/:token
 * @method POST
 * @access public
 */
const resetThePassword = asyncHandler(async (req, res) => {
  // TODO: Validation
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found!' });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    res.render('success-password');
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error' });
  }
});

module.exports = {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
};
