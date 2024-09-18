import express from 'express';
import { getAllEmp, addEmp, updateEmp, deleteEmp } from '../controller/userController.js';

const router = express.Router();

router.get('/getAll',getAllEmp);
router.post('/addEmp',addEmp);
router.put('/empUpdate/:empId',updateEmp);
router.delete('/empDelete/:empId', deleteEmp);


export default router;