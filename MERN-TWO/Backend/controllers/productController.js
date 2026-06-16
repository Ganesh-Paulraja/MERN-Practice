import productModel from "../models/productModel.js";
// import HandleError from "../utils/HandleError.js";
import HandleError  from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";


export const createProducts = handleAsyncError(async (req, res, next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({ success: true, product });
});


export const getAllProducts = handleAsyncError(async (req, res, next) => {
    const products = await productModel.find();
    res.status(200).json({ success: true, products });
});


export const getSingleProduct = handleAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) return next(new HandleError("Product Not Found", 404));
    res.status(200).json({ success: true, product });
});


export const updateProduct = handleAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) return next(new HandleError("Product Not Found", 404));


    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({ success: true, product });
});


export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) return next(new HandleError("Product Not Found", 404));


    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
});
