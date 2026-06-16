import express from 'express';
import { createProducts, getAllProducts, getSingleProduct, updateProduct, deleteProduct } from '../controllers/productController.js';


const router = express.Router();


router.route('/products')
  .get(getAllProducts)
  .post(createProducts);


router.route('/products/:id')
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct); 


export default router;