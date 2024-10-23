import { Router } from 'express';
import {
  postLogin,
  postRegister,
  postLogout,
  getProtected
} from '../controllers/authenticationController';
import { validateUserInput } from '../middlewares/userValidationMiddleware';

const router = Router();

router.post('/login', postLogin);
router.post('/register', validateUserInput, postRegister);
router.post('/logout', postLogout);

router.get('/protected', getProtected);

export default router;