const User = require('../model/User_m');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const JWTVerify = require('../middleware/JWTVerify');

const regist = asyncHandler(async (req, res) => {
    const { email, username, dname, passwordHash, prioritization} = req.body;

    if (!email || !username || !dname || !passwordHash || !prioritization) {
        return res.status(400).json({ message: "Mohon lengkapi seluruh box"});
    }

    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Email already exists"});
    }

    const hashedPass = await bcrypt.hash(passwordHash, 10);

    const userObject = {
        email, username, dname, passwordHash: hashedPass, prioritization
    }

    const user = await User.create(userObject);

    if (user) {
        return res.status(201).json({ message: "Berhasil membuat user."});
    } else {
        res.status(400), json({ message: "Invalid"})
    }
});

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.status(200).json(users)
});

const login = asyncHandler(async (req, res) => {
    const { username, passwordHash } = req.body;

    if ( !username || !passwordHash) {
        return res.status(400).json({ message: "Mohon lengkapi seluruh box"});
    }

    const user = await User.findOne({ username }).lean().exec();

    const match = await bcrypt.compare(passwordHash, user.passwordHash);

    if (match) {
        const payload = {
            id: user._id, username: user.username
        }
        const expiresIn = 60 * 60 * 1;
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn });
        res.cookie('token', token, { httpOnly: true, maxAge: expiresIn * 1000, secure: true, sameSite: 'none', path: '/'});
        return res.status(200).json({
            data: {
                id: user._id,
                username: user.username,
            },
            token: token,
            message: 'Login successful'
        });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

const getUserById = async (req, res) => {
  try {
    const userId = req.user.id; // Ambil userId dari token atau session
    const user = await User.findById(userId); // Ambil data dari database
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = asyncHandler(async (req, res) => {
    const { username, dname, passwordHash, prioritization } = req.body

    // Confirm data 
    if (!username || !dname) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    const userId = req.user.id;

    // Does the user exist to update?
    const user = await User.findById(userId).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== userId) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.dname = dname
    user.prioritization = prioritization

    if (passwordHash) {
        // Hash password 
        user.passwordHash = await bcrypt.hash(passwordHash, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
});

const logout = asyncHandler(async (req, res) => {
    // Menghapus cookie 'token' dari browser
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });

    return res.status(200).json({ message: 'Logout successful' });
});

module.exports = { regist, getAllUser, login, updateUser, logout, getUserById};