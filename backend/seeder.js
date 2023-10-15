import Product from "./models/Product.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import users from "./data/users.js";
import products from "./data/products.js";
import connect from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();
connect();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleData);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
