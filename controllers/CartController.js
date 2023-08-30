import CartModel from "../models/Cart.js";

export const create = async (req, res) => {
  try {
    const doc = new CartModel({
      book: req.body._id,
      user: req.userId,
    });

    const cart = await doc.save();

    const cartBook = await CartModel.findOne({
      _id: cart._doc._id,
    }).populate('book');

    res.json(
      cartBook,
    );
  } catch (error) {
    console.log(error);
    res.json([{
      msg: 'Ошибка добавления в корзину',
      param: 'server',
    }])
  }
};

export const getAll = async (req, res) => {
  try {
    const cart = await CartModel.find({
      user: req.userId
    }).populate('book');

    res.json(
      cart.filter((favoriteBook) => favoriteBook.book !== null)
    );
  } catch (error) {
    console.log(error);
    res.json([{
      msg: 'Ошибка получения корзины',
      param: 'server',
      status: 'error',
    }])
  }
};

export const remove = async (req, res) => {
  try {
    const bookId = req.params.id;
    CartModel.findOneAndDelete({
      book: bookId,
      user: req.userId,
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.json([{
          msg: 'Не удалось удалить книгу',
          param: 'server',
        }]);
      }
      if (!doc) {
        return res.json([{
          msg: 'Книга не найдена',
          param: 'server',
        }]);
      }
      return res.json({
        id: bookId,
        msg: 'Книга успешно удалена'
      })
    })
  } catch (error) {
    console.log(error);
    res.status(500).json([{
      msg: 'Ошибка удаления книги',
      param: 'server',
    }])
  }
};