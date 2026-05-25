import { Router } from 'express';
import { getContributorsInfo } from '../controllers/contributorController';

const router = Router();

router.post('/', getContributorsInfo);

export default router;
