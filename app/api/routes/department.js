const express = require('express');
const router = express.Router();
const DepartmentController = require('../controller/department');

router.get('/', DepartmentController.getAllDepartment);

router.get('/:deptId', DepartmentController.getSingleDepartment);

router.post('/', DepartmentController.createDepartment);

router.patch('/deptId:', DepartmentController.editDepartment);

router.delete('/deptId:', DepartmentController.deleteDepartment);

module.exports = router;