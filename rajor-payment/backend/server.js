require("dotenv").config();
import express from "express";
import paymentRoute from "./routes/paymentRoutes";
import Razorpay from "razorpay";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use("/api", paymentRoute);

async function main() {
  app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
  });
}

main();
