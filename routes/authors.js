const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require('../models/Author');

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const authors = await Author.find();
    res.status(200).json(authors);
  })
);

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    author
      ? res.status(200).json(author)
      : res.status(404).json({ message: 'author not found' });
  })
);

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
router.post(
  '/',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    res.status(201).json(result);
  })
);

/**
 * @desc Update author by id
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
router.put(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error)
      return res.status(201).json({ message: error.details[0].message });

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(author);
  })
);

/**
 * @desc Delete author by id
 * @route /api/authors/:id
 * @method DELETE
 * @access private (only admin)
 */
router.delete(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'author has been deleted' });
    } else {
      return res.status(404).json({ message: 'author not found' });
    }
  })
);

module.exports = router;
