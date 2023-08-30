import UserModel from "../models/User.js"

export default async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      _id: req.userId
    }).populate('role');
  
    if (user) {
      user.role.role === 'admin' ? next() : res.json([{ msg: 'Нет прав', param: 'server' }]);
    }
    else {
      return res.json({
        msg: 'Пользователь не найден',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Ошибка получения информации',
    })
  }
};