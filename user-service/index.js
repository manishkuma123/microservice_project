const express = require('express');
const app = express();
require('./db')
const PORT = process.env.PORT || 3001;
const userrouter = require('./routes/userroutes')



app.use(express.json())
app.use('/api',userrouter)







app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});