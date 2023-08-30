import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

export const registration = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(Number(process.env.BRCYPT_ROUNDS));
    const passwordHash = await bcrypt.hash(password, salt);

    const role = req.body.role || process.env.ROLE_CLIENT;

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash,
      role,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      },
    );

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role.role,
      createdAt: user.createdAt,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json([
      {
        msg: 'Ошибка при регистрации',
        param: 'server',
      },
    ]);
  }
};

export const auth = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    }).populate('role');

    if (!user) {
      return res.json([
        {
          msg: 'Пользователь не найден',
          param: 'email',
        },
      ]);
    }

    const passIsValid = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!passIsValid) {
      return res.json([
        {
          msg: 'Неверный логин или пароль',
          param: 'password',
        },
      ]);
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      },
    );

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role.role,
      createdAt: user.createdAt,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json([
      {
        msg: 'Ошибка авторизации',
        param: 'server',
      },
    ]);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.userId,
    }).populate('role');

    if (user) {
      req.userRole = user.role.role;
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role.role,
        createdAt: user.createdAt,
      });
    } else {
      return res.json({
        msg: 'Пользователь не найден',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Ошибка получения информации',
    });
  }
};
