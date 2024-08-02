import nodemailer from 'nodemailer';
import cron from 'node-cron';
import Email from '../models/emailModel.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

export const scheduleEmail = (email) => {
  const { scheduleTime, recipient, subject, body, attachments, recurring } = email;

  const sendEmail = async () => {
    try {
      await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: recipient,
        subject: subject,
        text: body,
        attachments: attachments,
      });
      email.status = 'sent';
      await email.save();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  cron.schedule(new Date(scheduleTime), sendEmail);

  if (recurring) {
    let recurrencePattern;
    switch (recurring) {
      case 'daily':
        recurrencePattern = '0 0 * * *'; // Adjust the cron pattern as needed
        break;
      case 'weekly':
        recurrencePattern = '0 0 * * 0'; // Adjust the cron pattern as needed
        break;
      case 'monthly':
        recurrencePattern = '0 0 1 * *'; // Adjust the cron pattern as needed
        break;
      case 'quarterly':
        recurrencePattern = '0 0 1 */3 *'; // Adjust the cron pattern as needed
        break;
    }
    cron.schedule(recurrencePattern, sendEmail);
  }
};