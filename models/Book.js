import mongoose from 'mongoose';

const BookScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    age_limit: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    copyright: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model('Book', BookScheme);
