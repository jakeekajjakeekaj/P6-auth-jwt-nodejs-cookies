import { Router } from 'express';
import { getHome } from '../controllers/homeControllers';

const router = Router();

router.get('/home', getHome);

export default router;