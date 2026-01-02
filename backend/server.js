const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
require('dotenv').config();

const { sendPasswordResetEmail } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting for password reset
const resetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests per hour per IP
    message: 'Too many password reset requests. Please try again later.'
});

// In-memory storage (replace with database in production)
const resetTokens = new Map();

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Forgot Password Endpoint
app.post('/api/forgot-password', resetLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Valid email is required' });
        }

        // Generate secure reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

        // Store token (in production, save to database)
        resetTokens.set(resetToken, {
            email,
            expiry: resetTokenExpiry
        });

        // Send email
        await sendPasswordResetEmail(email, resetToken);

        // Log for development
        if (process.env.NODE_ENV === 'development') {
            console.log('\n=== PASSWORD RESET LINK ===');
            console.log(`Email: ${email}`);
            console.log(`Link: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`);
            console.log(`Expires: ${new Date(resetTokenExpiry).toLocaleString()}`);
            console.log('===========================\n');
        }

        res.json({
            message: 'Password reset email sent successfully',
            // Only include in development
            ...(process.env.NODE_ENV === 'development' && {
                resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
            })
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to send reset email' });
    }
});

// Reset Password Endpoint
app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Verify token
        const tokenData = resetTokens.get(token);

        if (!tokenData) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        if (Date.now() > tokenData.expiry) {
            resetTokens.delete(token);
            return res.status(400).json({ error: 'Reset token has expired' });
        }

        // In production: Update user password in database
        // const hashedPassword = await bcrypt.hash(newPassword, 10);
        // await User.updateOne({ email: tokenData.email }, { password: hashedPassword });

        // Delete used token
        resetTokens.delete(token);

        console.log(`Password reset successful for: ${tokenData.email}`);

        res.json({ message: 'Password reset successful' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

// Cleanup expired tokens every hour
setInterval(() => {
    const now = Date.now();
    for (const [token, data] of resetTokens.entries()) {
        if (now > data.expiry) {
            resetTokens.delete(token);
        }
    }
}, 3600000);

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email service: ${process.env.SENDGRID_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
