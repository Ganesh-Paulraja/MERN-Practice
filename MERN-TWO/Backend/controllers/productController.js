import productModel from "../models/produtmodel.js";
import HandleError from "../utils/handle-error.js";

export const createProducts = async (req, res, next) => {
  try {
    const product = await productModel.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    let product = await productModel.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product Not Found", 404));
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product Not Found", 404));
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
