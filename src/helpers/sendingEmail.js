import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'willmunyaneza@gmail.com',
    pass: '123Munyan#z@',
  },
});

const sendEmailNotification = (sender, receiver, message) => {
  const options = {
    from: sender,
    to: receiver,
    subject: 'Updated Parcel Delivery Order',
    text: message,
  };
  transport.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
  });
};

export default sendEmailNotification;
