// product-service/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
require('./db')
const productroutes = require('./routes/productroutes')
app.use(express.json())

app.use('/api', productroutes)
app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});