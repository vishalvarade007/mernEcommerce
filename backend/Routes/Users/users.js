const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../../Controllers/UserControllers/userController");
const {getUserDetails} = require("../../Controllers/UserControllers/userController");
const {isAuthenticatedUser, authorizeRoles} = require("../../middleware/auth");
const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.post("/password/forgot",forgotPassword);

router.put("/password/reset/:token",resetPassword);

router.get("/logout",logoutUser);

router.get("/me",isAuthenticatedUser,getUserDetails);

router.put("/password/update",isAuthenticatedUser,updateUserPassword);

router.put("/me/update",isAuthenticatedUser,updateUserProfile);

router.get("/admin/users",isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getSingleUser);

router.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),updateUserRole);

router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser);


module.exports = router;