import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from "stripe";

//placing user order from frontend

export const placeOrder = async (req, res) => {
  const userId = req.userId;
  const { items, amount, address } = req.body;
  if (!items || !amount || !address) {
    return res.json({ ok: false, message: "entities required" });
  }
  try {
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
      payment: false,
    });
    await newOrder.save();

    const user = await userModel.findById(userId);
    user.cartData = {};
    await user.save();

    res.json({ ok: true, order: newOrder, message: "order taken" });
  } catch (error) {
    res.json({ ok: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    if (!orders) {
      return res.json({ ok: false, message: "no order found" });
    }
    res.json({ ok: true, orders });
  } catch (err) {
    res.json({ ok: false, message: err.message });
  }
};
export const getAllOrderFromAdmin = async (req, res) => {
  try {
    const allOrders = await orderModel.find();
    if (allOrders.length > 0) {
      res.json({ ok: true, allOrders });
    } else {
      res.json({ ok: false, message: "no order found" });
    }
  } catch (error) {
    res.json({ ok: false, message: error.message });
  }
};

export const updateOrderController = async (req, res) => {
  try {
    const { orderId, field, value } = req.body;

    // Validate required fields
    if (!orderId || !field || !value) {
      return res.status(400).json({ ok: false, message: "Missing required fields" });
    }


    // Update the order
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { [field]: value },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found" });
    }

    res.json({ ok: true, order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ ok: false, message: error.message });
  }
};
