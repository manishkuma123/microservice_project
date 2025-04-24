
require('dotenv').config();
const mongoose = require('mongoose');


const db = "mongodb+srv://manishpdotpitchtechnologies:DYJasKWtNkvM07Tb@cluster0.iqmhgcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('database connected'))
.catch((err) => console.error('MongoDB connection error:', err));
