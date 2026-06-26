import productModel from "../models/productModel.js";
import HandleError from "../utils/HandleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";



export const createProducts = handleAsyncError(async (req, res, next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({ success: true, product });
});


export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 4;
  const apiFeatures = new APIFunctionality(productModel.find(), req.query)
    .search()
    .filter();


  //    Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();


  // Calculate totalPages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;


  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }


  //Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;


  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
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
