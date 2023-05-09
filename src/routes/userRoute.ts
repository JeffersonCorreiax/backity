import express from 'express';
import { getAllUsers } from '../controllers/userController';
import { createUser } from '../controllers/userController';
import { getUserById } from '../controllers/userController';
import { updateUser } from '../controllers/userController';
import { deleteUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;