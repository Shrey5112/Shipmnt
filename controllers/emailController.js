import Email from '../models/emailModel.js';
import { scheduleEmail } from '../services/emailService.js';

export const scheduleEmailHandler = async (req, res) => {
  try {
    const email = new Email(req.body);
    await email.save();
    scheduleEmail(email);
    res.status(201).send(email);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllScheduledEmails = async (req, res) => {
  try {
    const emails = await Email.find({ status: 'scheduled' });
    res.status(200).send(emails);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getScheduledEmailById = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) {
      return res.status(404).send('Email not found');
    }
    res.status(200).send(email);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const cancelScheduledEmail = async (req, res) => {
  try {
    const email = await Email.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!email) {
      return res.status(404).send('Email not found');
    }
    res.status(200).send(email);
  } catch (error) {
    res.status(500).send(error.message);
  }
};