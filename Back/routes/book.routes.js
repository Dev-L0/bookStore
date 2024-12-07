import express from 'express';
import {getBook, getAllBooks, createBook,getBookbyId, updateBook, deleteBook } from '../controllers/book.controller.js';
import { adminRoute, verifyToken } from '../middleware/verifyToken.js';
import {cloudinaryFileUploader} from '../middleware/fileUploader.js';
const router = express.Router();


router.get('/', getBook);
router.get('/all-books', getAllBooks);


router.use(verifyToken, adminRoute);
router.post('/create-book', cloudinaryFileUploader.single('image'), createBook);
router.get('/:id', getBookbyId);
router.patch('/:id',cloudinaryFileUploader.single('image'), updateBook);
router.delete('/:id',deleteBook);




export default router;