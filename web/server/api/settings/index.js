import express from 'express';
import * as controller from './settings.controller';

const router = new express.Router();

router.get('/settings', controller.getSettings);
router.post('/settings', controller.setSettings);

export default router;
