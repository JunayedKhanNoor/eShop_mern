import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
//@desc fetch all product
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc fetch single product
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc delete s  product
//@route DELETE /api/products/:id
//@access admin/protected
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    // if (req.user._id === product.user._id) {
    //   //If I want, only the admin who added the product , only he can delete
    // }
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc create a product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a product
//@route PUT /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, countInStock, category, numReviews, description } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc create new review
//@route PUT /api/products/:id/review
//@access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() == req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product Already Reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review Added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
