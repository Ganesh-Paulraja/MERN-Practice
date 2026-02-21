import express from 'express'
const router = express.Router();
import { getAllProducts } from '../controllers/productController.js';

router.route('/products')
  .get(getAllProducts)

export default router;