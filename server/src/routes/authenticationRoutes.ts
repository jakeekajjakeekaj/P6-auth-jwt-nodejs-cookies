import { Router } from 'express';
import {
  postLogin,
  postRegister,
  postLogout
} from '../controllers/authenticationController';

const router = Router();

router.post('/login', postLogin);
router.post('register', postRegister);
router.post('/logout', postLogout);

export default router;