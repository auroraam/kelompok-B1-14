const express = require('express');
const router = express.Router();
const {regist, getAllUser, login, updateUser, logout} = require('../controller/User');
const {verifyToken} = require('../middleware/JWTVerify');
router.route('/')
    .get(getAllUser)
    .post(regist)
    .patch(verifyToken, updateUser);

router.post('/login', login);

router.get('/logout', logout);

module.exports = router;