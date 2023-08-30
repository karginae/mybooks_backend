import { body } from 'express-validator';

export const regValidator = [
  body('email', 'Укажите корректный адрес почты').isEmail(),
  body('password', 'Длина пароля должна быть не менее 6 символов').isLength({ min: 6 }),
  body('fullName', 'Укажите имя')
    .isLength({ min: 2 })
    .matches(/^[A-Za-zА-Яа-я\s]+$/)
    .withMessage('Имя должно содержать только буквы'),
];

export const authValidator = [
  body('email', 'Укажите корректный адрес почты').isEmail(),
  body('password', 'Длина пароля должна быть не менее 6 символов').isLength({ min: 6 }),
];

export const addBookValidator = [
  body('title', 'Укажите название')
    .notEmpty()
    .matches(/^[0-9A-Za-zА-Яа-я\s\(\)\.\-]+$/)
    .withMessage('Некорректное название'),
  body('author', 'Слишком корокто')
    .isLength({ min: 2 })
    .matches(/^[A-Za-zА-Яа-я\s\(\)\-\.]+$/)
    .withMessage('Некорректное имя'),
  body('year', 'Год должен состоять из четырех чисел').matches(/^[0-9]{4}$/),
  body('pages', 'Некорректный объем')
    .isLength({ min: 1, max: 6 })
    .matches(/^[0-9]+$/)
    .withMessage('Значение должно состоять из чисел'),
  body('price', 'Укажите цену')
    .isLength({ min: 1, max: 6 })
    .matches(/^[0-9]+$/)
    .withMessage('Значение должно состоять из чисел'),
  body('cover', 'Укажите обложку').notEmpty().isString().withMessage('Выберите обложку'),
  body('isbn', 'Некорректный ISBN')
    .isLength({ min: 17, max: 17 })
    .matches(/^[0-9\-]+$/)
    .withMessage('Значение должно состоять из чисел и дефисов'),
  body('age_limit', 'Некорректное возрастное ограничение')
    .isLength({ min: 1, max: 2 })
    .matches(/^[0-9]+$/)
    .withMessage('Значение должно состоять из чисел'),
  body('genre', 'Некорректный жанр')
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-zА-Яа-я\s]+$/)
    .withMessage('Жанр должен состоять только из букв'),
  body('copyright', 'Слишком коротко')
    .isLength({ min: 2 })
    .matches(/^[A-Za-zА-Яа-я\s\(\)\-]+$/)
    .withMessage('Некорректное значение'),
];

export const orderValidator = [
  body('name', 'Укажите имя')
    .notEmpty()
    .isLength({ min: 2 })
    .matches(/^[A-Za-zА-Яа-я\s]+$/)
    .withMessage('Имя должно содержать только буквы'),
  body('surname', 'Укажите фамилию')
    .notEmpty()
    .isLength({ min: 2 })
    .matches(/^[A-Za-zА-Яа-я\s]+$/)
    .withMessage('Фамилия должна содержать только буквы'),
  body('tel', 'Некорректная длина номера')
    .isLength({ min: 12, max: 12 })
    .matches(/^[[0-9\+]+$/)
    .withMessage('Некорректный формат номера'),
  body('email', 'Укажите корректный адрес почты').isEmail(),
];
