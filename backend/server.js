import express from "express";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import ProductRouter from "./routes/productRouter.js";
import UserRouter from "./routes/userRouter.js";
import OrderRouter from "./routes/orderRouter.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

connect();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(5000, () => {
  console.log("server is running");
});
