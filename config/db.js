const mongoose = require('mongoose');

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected...');
  } catch (error) {
    console.log('Error ', err);
  }
}

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected...'))
//   .catch((err) => console.log('Error ', err));

module.exports = connectToDB;
