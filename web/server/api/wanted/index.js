import express from 'express';
import * as controller from './wanted.controller';
const router = express.Router();

router.get('/wanted', controller.listWanted);
router.post('/wanted/add', controller.addWanted);
router.post('/wanted/remove', controller.removeWanted);

export default router;
