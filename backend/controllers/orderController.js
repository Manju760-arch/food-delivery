import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "https://food-del-frontend-m48s.onrender.com";
  

  try {
    console.log("USER FROM TOKEN 👉", req.user);

    // Create new order in MongoDB
    const newOrder = new orderModel({
      userId: req.user.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    // Stripe requires minimum amount 50 cents (~₹50), convert ₹ to paisa
    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // in paisa
      },
      quantity: item.quantity,
    }));

    // Add delivery fee
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100, // ₹2 delivery fee
      },
      quantity: 1,
    });

    // Check total amount for Stripe minimum
    const totalAmount = req.body.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + 2;
    if (totalAmount * 100 < 50) {
      // Stripe minimum $0.50 → ₹50 approx
      return res.status(400).json({
        success: false,
        message: `Total amount too small for Stripe payment. Minimum ₹1 required.`,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.status(500).json({ success: false, message: "Order failed" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (success === "true") {
      order.payment = true;
      // Keep status as "Food Processing" for now
      // Only change when food is actually processed
    }

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id }); // ✅ from token
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//listing orders for admin panel
const listOrders=async(req,res)=>{
  try{
const orders=await orderModel.find({});
res.json({success:true, data:orders})
  }catch(error){
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}
//api for updating order status
const updateStatus=async(req, res)=>{
    try{
      await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
      res.json({success:true, message:"Status Updated"})
    }catch(error){
      console.log(error)
      res.json({success:false, message:"Error"})
    }
}
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
