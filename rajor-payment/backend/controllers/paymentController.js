import { instance } from "../server";
const crypto = require("crypto");

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};
export const paymentVerification = async (req, res) => {
  let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  console.log(req.body);

  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  let response = { signatureIsValid: "false" };

  if (expectedSignature === req.body.razorpay_signature)
    response = { signatureIsValid: "true" };
  console.warn("success");
  res.send(response);
};
