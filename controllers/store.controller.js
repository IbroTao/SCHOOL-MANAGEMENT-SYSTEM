const { Store } = require("../models/store.model");
const asyncHandler = require("express-async-handler");
const { validateMongoID } = require("../utils/validateMongoID");

const addProductToStore = asyncHandler(async (req, res) => {
  try {
    const userId = req.get("userAccess");
    validateMongoID(userId);
    const body = req.body;
    const file = req.file;
    const image = file.path;
    if (!file)
      return res
        .status(400)
        .json({ message: "File could not processed, try again" });

    const product = await Store.create({
      ...body,
      image,
      userId: userId,
    });
    res
      .status(201)
      .json({
        message: "Product added to the store",
        data: product,
        productId: product._id,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

const editProduct = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const productId = req.params.id;
    validateMongoID(id);
    const product = await Store.findByIdAndUpdate(body, productId);
    res
      .status(200)
      .json({
        message: "Product edited and updated successfully",
        data: product,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Store.find().sort({
      createdAt: "desc",
    });
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    validateMongoID(productId);
    const product = await Store.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product found", product: product });
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    validateMongoID(productId);
    const product = await Store.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

const sortByCategory = asyncHandler(async (req, res) => {
  try {
    const product = await Store.find({ category: req.body.category }).sort({
      createdAt: "desc",
    });
    if (!product)
      return res
        .status(404)
        .json({ message: `No product found in ${product.category} category ` });

    res.status(200).json({ products: product });
  } catch (err) {
    res.status(500).json(err);
  }
});

const sortByType = asyncHandler(async (req, res) => {
  try {
    const product = await Store.find({ type: req.body.type }).sort({
      createdAt: "desc",
    });
    if (!product)
      return res
        .status(404)
        .json({ messsage: `No product found in ${product.category} category` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  addProductToStore,
  editProduct,
  getSingleProduct,
  deleteProduct,
  sortByCategory,
  sortByType,
  getProducts,
};
