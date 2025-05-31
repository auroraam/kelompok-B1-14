const express = require('express');
const router = express.Router();
const {createTask, getAllTask, getTaskByTaskId, getTaskByUserId, updateTask, markTaskDone, updateLateStatus, updateTaskCategory, deleteTask} = require('../controller/Task');
const {verifyToken} = require('../middleware/JWTVerify');
router.route('/')
    .get(verifyToken,  getAllTask)
    .post(verifyToken, createTask)
    .patch(verifyToken, updateTask)
    .delete(verifyToken, deleteTask)

router.get('/user', verifyToken, getTaskByUserId);

router.get('/task', verifyToken, getTaskByTaskId);

router.patch('/done', verifyToken, markTaskDone);

router.patch('/late', verifyToken, updateLateStatus);

router.patch('/cat', verifyToken, updateTaskCategory);

module.exports = router;