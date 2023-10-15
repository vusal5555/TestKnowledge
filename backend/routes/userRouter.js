import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getAllUserById,
  updateUser,
  deleteUser,
  logOut,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getAllUsers).post(registerUser);
router.route("/login").post(authUser);
router.route("/logout").post(protect, logOut);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, getAllUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
