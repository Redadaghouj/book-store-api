const asyncHandler = require('express-async-handler');
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require('../models/User');

/**
 * @desc Register user
 * @route api/auth/register
 * @method POST
 * @access public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: 'This user already exist' });

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const result = await user.save();
  const token = user.generateToken();

  const { password, ...others } = result._doc;
  res.status(201).json({ ...others, token });
});

/**
 * @desc Login user
 * @route api/auth/login
 * @method POST
 * @access public
 */

const loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'invalid email or password' });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(404).json({ message: 'invalid email or password' });
  }

  const token = user.generateToken();

  const { password, ...others } = user._doc;
  res.status(200).json({ ...others, token });
});

module.exports = {
  registerUser,
  loginUser,
};
