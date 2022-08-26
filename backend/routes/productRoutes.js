import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
export default router;

// import express from 'express';
// import Product from '../models/productModel.js';
// import asyncHandler from 'express-async-handler';
// const router = express.Router();
// //@desc fetch all product
// //@route GET /api/products
// //@access public
// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );
// //@desc fetch single product
// //@route GET /api/products/:id
// //@access public
// router.get(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404);
//       throw new Error('Product not found');
//     }
//   })
// );
// export default router;
