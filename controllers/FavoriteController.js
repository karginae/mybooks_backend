import FavoriteModel from '../models/Favorite.js';

export const create = async (req, res) => {
  try {
    const doc = new FavoriteModel({
      book: req.body._id,
      user: req.userId,
    });

    const favorite = await doc.save();

    const favoriteBook = await FavoriteModel.findOne({
      _id: favorite._doc._id,
    }).populate('book');

    res.json(favoriteBook);
  } catch (error) {
    console.log(error);
    res.json([
      {
        msg: 'Ошибка добавления в избранные',
        param: 'server',
      },
    ]);
  }
};

export const getAll = async (req, res) => {
  try {
    const favorites = await FavoriteModel.find({
      user: req.userId,
    }).populate('book');

    res.json(favorites.filter((favoriteBook) => favoriteBook.book !== null));
  } catch (error) {
    console.log(error);
    res.json([
      {
        msg: 'Ошибка получения избранных',
        param: 'server',
        status: 'error',
      },
    ]);
  }
};

export const remove = async (req, res) => {
  try {
    const bookId = req.params.id;
    FavoriteModel.findOneAndDelete(
      {
        book: bookId,
        user: req.userId,
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
        msg: 'Ошибка: невозможно убрать книгу из избранных',
        param: 'server',
      },
    ]);
  }
};
