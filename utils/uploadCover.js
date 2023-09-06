import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'covers');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
