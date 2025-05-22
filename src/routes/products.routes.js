const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

router.post('/', auth, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;