import express from 'express';
import {
  scheduleEmailHandler,
  getAllScheduledEmails,
  getScheduledEmailById,
  cancelScheduledEmail,
} from '../controllers/emailController.js';

const router = express.Router();

router.post('/schedule-email', scheduleEmailHandler);
router.get('/scheduled-emails', getAllScheduledEmails);
router.get('/scheduled-emails/:id', getScheduledEmailById);
router.delete('/scheduled-emails/:id', cancelScheduledEmail);

export default router;