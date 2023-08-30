import { validationResult } from 'express-validator';

import OrderModel from '../models/Order.js';

export const create = async (req, res) => {
  try {
    const doc = new OrderModel({
      name: req.body.name,
      surname: req.body.surname,
      tel: req.body.tel,
      email: req.body.email,
      user: req.userId,
      books: req.body.orderBooks,
      totalPrice: req.body.totalPrice,
    });

    const order = await doc.save();

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json([
      {
        msg: 'Ошибка создания заказа',
        param: 'server',
      },
    ]);
  }
};
