const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview, getAdminProducts } = require("../../Controllers/ProductControllers/productControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../../middleware/auth");
const router = express.Router();

router.get("/products",getAllProducts);

router.get("/products/:id",getProductDetails);

router.get("/admin/products",isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);

router.post("/admin/products/new",isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.put("/admin/products/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

router.delete("/admin/products/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.put("/review",isAuthenticatedUser,createProductReview);

router.get("/reviews",getProductReviews);

router.delete("/reviews",isAuthenticatedUser,deleteProductReview);

module.exports = router;