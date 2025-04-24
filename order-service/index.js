const express = require('express');
require('./db')
const orderService = require('./routes/order');
const Order = require('./module/order');
const { authentication } = require('./authentication');

const app = express();
const port = 3003; 

app.use(express.json());

app.post('/orders', authentication, async (req, res) => {
  const { userId, items } = req.body;
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'userid and items are required' });
  }

  try {
    
    const newOrder = await orderService.createOrder(userId, items);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'failed to create ', details: error.message });
  }
});

app.get('/orders', authentication,async(req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json({orders})
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
app.get('/orders/:id', authentication, async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await orderService.getOrderById(orderId)
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'failed to fetch order', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`orderservice listening on port ${port}`);
});