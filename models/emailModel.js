import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  attachments: { type: Array },
  scheduleTime: { type: Date, required: true },
  recurring: { type: String, enum: ['daily', 'weekly', 'monthly', 'quarterly'], default: null },
  status: { type: String, enum: ['scheduled', 'sent', 'cancelled'], default: 'scheduled' },
});

const Email = mongoose.model('Email', emailSchema);

export default Email;