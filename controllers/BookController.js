import BookModel from '../models/Book.js';

export const create = async (req, res) => {
  try {
    const doc = new BookModel({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      pages: req.body.pages,
      price: req.body.price,
      cover: req.body.cover,
      isbn: req.body.isbn,
      age_limit: req.body.age_limit,
      genre: req.body.genre,
      copyright: req.body.copyright,
    });

    const book = await doc.save();

    res.json({
      ...book._doc,
    });
  } catch (error) {
    console.log(error);
    res.json([
      {
        msg: 'Ошибка добавления книги',
        param: 'server',
      },
    ]);
  }
};

export const getAll = async (req, res) => {
  try {
    const books = await BookModel.find({});

    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json([
      {
        msg: 'Ошибка получения книг',
        param: 'server',
      },
    ]);
  }
};

export const getOne = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOne({
      _id: bookId,
    });

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json([
      {
        msg: 'Ошибка получения книг',
        param: 'server',
      },
    ]);
  }
};

export const remove = async (req, res) => {
  try {
    const bookId = req.params.id;
    BookModel.findOneAndDelete(
      {
        _id: bookId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.json([
            {
              msg: 'Не удалось удалить книгу',
              param: 'server',
            },
          ]);
        }
        if (!doc) {
          return res.json([
            {
              msg: 'Книга не найдена',
              param: 'server',
            },
          ]);
        }
        return res.json({
          id: bookId,
          msg: 'Книга успешно удалена',
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json([
      {
        msg: 'Ошибка удаления книги',
        param: 'server',
      },
    ]);
  }
};

export const update = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.updateOne(
      {
        _id: bookId,
      },
      {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        pages: req.body.pages,
        price: req.body.price,
        cover: req.body.cover,
        isbn: req.body.isbn,
        age_limit: req.body.age_limit,
        genre: req.body.genre,
        copyright: req.body.copyright,
      },
    );
    res.json(book);
  } catch (error) {
    console.log(error);
    res.json([
      {
        msg: 'Ошибка сохранения книги',
        param: 'server',
      },
    ]);
  }
};
