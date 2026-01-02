const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendPasswordResetEmail = async (email, resetToken) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const msg = {
        to: email,
        from: {
            email: process.env.FROM_EMAIL,
            name: process.env.FROM_NAME
        },
        subject: 'Password Reset Request - UniFab',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff;
          }
          .header { 
            background: linear-gradient(135deg, #d4af37 0%, #8b7355 100%); 
            padding: 40px 20px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
          }
          .header h1 { 
            color: white; 
            margin: 0; 
            font-size: 28px;
          }
          .logo {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 24px;
            color: #d4af37;
            margin-bottom: 15px;
          }
          .content { 
            background: #f9f9f9; 
            padding: 40px 30px; 
          }
          .button { 
            display: inline-block; 
            padding: 15px 40px; 
            background: #d4af37;
            color: white !important; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold; 
            margin: 25px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .button:hover {
            background: #c49d2f;
          }
          .link-box {
            background: white;
            padding: 15px;
            border-radius: 5px;
            word-break: break-all;
            color: #666;
            font-size: 14px;
            margin: 15px 0;
          }
          .footer { 
            background: #333; 
            color: #999; 
            padding: 30px 20px; 
            text-align: center;
            font-size: 13px; 
            border-radius: 0 0 10px 10px; 
          }
          .footer p {
            margin: 5px 0;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">UF</div>
            <h1>🔐 Password Reset Request</h1>
          </div>
          
          <div class="content">
            <p style="font-size: 16px;"><strong>Hello,</strong></p>
            
            <p>We received a request to reset the password for your UniFab account.</p>
            
            <p>Click the button below to create a new password:</p>
            
            <div style="text-align: center;">
              <a href="${resetLink}" class="button">Reset My Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="link-box">${resetLink}</div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This link will expire in <strong>1 hour</strong> for security reasons.
            </div>
            
            <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns about your account security.</p>
            
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>The UniFab Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p><strong>© 2024 UniFab - Professional Workwear</strong></p>
            <p>This is an automated email. Please do not reply to this message.</p>
            <p style="margin-top: 15px; font-size: 11px;">
              UniFab Ltd. | Professional Workwear Solutions
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
        text: `
      Password Reset Request - UniFab
      
      Hello,
      
      We received a request to reset the password for your UniFab account.
      
      Click this link to reset your password: ${resetLink}
      
      This link will expire in 1 hour.
      
      If you didn't request this password reset, please ignore this email.
      
      Best regards,
      The UniFab Team
    `
    };

    try {
        await sgMail.send(msg);
        console.log('Password reset email sent to:', email);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendPasswordResetEmail };
