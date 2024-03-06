import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, required: true },
  password: { type: String, unique: true, required: true },
});

export default mongoose.model('User', userSchema);
