import { Router } from 'express';
import { getLanguagesInfo } from '../controllers/languageController';

const router = Router();

router.post('/', getLanguagesInfo);

export default router;
