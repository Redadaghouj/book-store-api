const { Schema, model } = require('mongoose');
const Joi = require('joi');

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    description: {
      type: String,
      trim: true,
      minlength: 5,
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ['soft cover', 'hard cover'],
    },
  },
  { timestamps: true }
);

const Book = model('Book', BookSchema);

validateCreateBook = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid('soft cover', 'hard cover').required(),
  });

  return schema.validate(obj);
};

validateUpdateBook = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string(),
    description: Joi.string().min(5).trim(),
    price: Joi.number().min(0),
    cover: Joi.string().valid('soft cover', 'hard cover'),
  });

  return schema.validate(obj);
};

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
