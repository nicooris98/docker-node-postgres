const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }
    const updatedProduct = await Product.findByPk(req.params.id);
    res.send(updatedProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }
    res.send({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};