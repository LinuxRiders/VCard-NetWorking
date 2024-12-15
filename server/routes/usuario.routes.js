import { Router } from 'express';
import { getDataUser } from '../controllers/users.controller.js';

const router = Router();

// Register Manual user
router.post('/getData', getDataUser);


export default router;