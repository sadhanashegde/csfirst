import { Router } from 'express';
import { getRepoInfo } from '../controllers/repoController';

const router = Router();

router.post('/', getRepoInfo);

export default router;
