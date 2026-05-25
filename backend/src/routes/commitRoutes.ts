import { Router } from 'express';
import { getCommitsInfo } from '../controllers/commitController';

const router = Router();

router.post('/', getCommitsInfo);

export default router;
