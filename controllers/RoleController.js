import RoleModel from "../models/Role.js";

export const create = async (req, res) => {
  try {
    const doc = new RoleModel({
      role: req.body.role,
    });

    const role = await doc.save();

    res.json(
      role,
    );
  } catch (error) {
    console.log(error);
    res.json([{
      msg: 'Ошибка добавления роли',
      param: 'server',
    }])
  }
};