// pages/api/user.js
import asyncHandler from 'express-async-handler'; // gunakan middleware asyncHandler
import User from '../../backend/model/User'; // model user kamu (sesuaikan dengan model di backend)
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST': // Untuk login
      return handleLogin(req, res);
      
    case 'PATCH': // Untuk update user
      return handleUpdate(req, res);

    case 'GET': // Untuk mendapatkan data user
      return handleGet(req, res);

    case 'DELETE': // Untuk delete user
      return handleDelete(req, res);

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Function untuk login
const handleLogin = async (req, res) => {
  const { username, passwordHash } = req.body;
  
  // Validasi user
  const user = await User.findOne({ username });
  if (!user || user.passwordHash !== passwordHash) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate token
  const token = jwt.sign({ id: user._id, username: user.username }, 'secretKey', { expiresIn: '1h' });
  res.status(200).json({ token });
};

// Function untuk update user
const handleUpdate = async (req, res) => {
  const { username, email, passwordHash } = req.body;
  const { userId } = req.query;  // Bisa ambil dari query jika kamu ingin pass userId lewat URL

  // Update user
  const updatedUser = await User.findByIdAndUpdate(userId, { username, email, passwordHash }, { new: true });

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(updatedUser);
};

// Function untuk mendapatkan data user
const handleGet = async (req, res) => {
  const { userId } = req.query;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Function untuk delete user
const handleDelete = async (req, res) => {
  const { userId } = req.query;

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User deleted successfully' });
};
