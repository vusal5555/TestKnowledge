import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrdertoDeliver,
  updateOrdertoPaid,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/pay").put(protect, updateOrdertoPaid);
router.route("/:id/deliver").put(protect, admin, updateOrdertoDeliver);
router.route("/:id").get(protect, admin, getOrderById);

export default router;
