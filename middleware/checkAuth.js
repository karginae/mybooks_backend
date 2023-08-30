import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded._id;
      next();
    } catch (error) {
      console.log(error.name);
      return res.json({
        status: 401,
      });
    }
  } else {
    return res.json({
      status: 401,
    });
  }
};
