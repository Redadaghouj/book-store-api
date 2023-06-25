const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { User, validateUpdateUser } = require('../models/User');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');

/**
 * @desc Update user by id
 * @route api/users/id
 * @method PUT
 * @access private
 */

module.exports.updateUserById = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const result = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true }
  ).select('-password');

  res.status(200).json(result);
});

/**
 * @desc Get all users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */

module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

/**
 * @desc Get user by id
 * @route /api/users/id
 * @method GET
 * @access private (only admin & user himself)
 */

module.exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});

/**
 * @desc Delete user by id
 * @route /api/users/id
 * @method DELETE
 * @access private (only admin & user himself)
 */

module.exports.deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'user has been deleted' });
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});
