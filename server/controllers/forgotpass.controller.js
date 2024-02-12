const { User } = require('../models');
// const Model = User;
const nodemailer = require('nodemailer');
const { google } = require('google-auth-library');

const client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token and save it to the user in the database
        const resetToken = user.generateResetToken();
        await user.save();

        // Send an email with the reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'If this fails... I blame Kurt!',
            html: `Click <a href="${resetLink}">here</a> to reset your password, you idiot.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Reset email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};