
const Order = require('../module/order');
const axios = require('axios');


const userServiceBaseUrl = 'http://localhost:3001';
const productServiceBaseUrl = 'http://localhost:3002'; 

async function createOrder(userId, items) {
  try {
    const userResponse = await axios.get(`${userServiceBaseUrl}/api/users/${userId}`);
    const user = userResponse.data;
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const productResponse = await axios.get(`${productServiceBaseUrl}/api/product/${item.productId}`);
      const product = productResponse.data;
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      totalAmount += item.quantity * product.price;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price, 
      });
    }

    const newOrder = new Order({ userId, items: orderItems, totalAmount });
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
async function getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return null; 
      }
  
      const enrichedItems = [];
      for (const item of order.items) {
        try {
          const productResponse = await axios.get(`${productServiceBaseUrl}/api/product/${item.productId}`);
          const product = productResponse.data;
          enrichedItems.push({
            ...item.toObject(),
            productName: product.productname,
          });
        } catch (error) {
          console.error(`Error fetching product ${item.productId}:`, error.message);
       
          enrichedItems.push({ ...item.toObject(), productName: 'Product info unavailable' });
        }
      }
  
      return { ...order.toObject(), items: enrichedItems };
  
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

module.exports = {
  createOrder,
getOrderById
};