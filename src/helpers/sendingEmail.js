import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'willmunyaneza@gmail.com',
    pass: '123Munyan#z@',
  },
});

const sendEmailNotification = (receiver, message) => new Promise((resolve, reject) => {
  const mailOptions = {
    from: '"From name" <willmunyaneza@gmail.com>',
    to: receiver,
    subject: 'Parcel updated',
    html: `${message}`,
  };

  transport.sendMail(mailOptions, async (error, info) => {
    if (error) {
      reject(error);
    }
    resolve(info);
  });
});

export default sendEmailNotification;
