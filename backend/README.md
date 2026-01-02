# UniFab Backend Setup Guide

## 📧 Email Integration with SendGrid

### Step 1: Get SendGrid API Key

1. **Sign up for SendGrid:**
   - Go to https://signup.sendgrid.com/
   - Create a free account (100 emails/day free forever)

2. **Create API Key:**
   - Login to SendGrid dashboard
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name it "UniFab Password Reset"
   - Select "Full Access" or "Mail Send" permission
   - Click "Create & View"
   - **COPY THE KEY** (you won't see it again!)

3. **Verify Sender Email:**
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Enter your email (e.g., noreply@unifab.co.uk)
   - Check your email and verify

### Step 2: Install Backend

Open a **new terminal** in the `backend` folder:

```bash
cd backend
npm install
```

### Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Edit `.env` and add your SendGrid API key:
```env
SENDGRID_API_KEY=SG.your_actual_api_key_here
FROM_EMAIL=your-verified-email@example.com
FROM_NAME=UniFab
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3001
📧 Email service: Configured
🌍 Environment: development
```

### Step 5: Update Frontend

The frontend needs to call your backend API. Update the fetch URLs:

**In `src/pages/Auth.tsx`** - Already shows the correct code in the guide!

**In `src/pages/ResetPassword.tsx`** - Already shows the correct code in the guide!

Just make sure the URLs point to `http://localhost:3001/api/...`

## 🧪 Testing

1. **Start both servers:**
   - Frontend: `pnpm run dev` (port 5173)
   - Backend: `npm run dev` (port 3001)

2. **Test forgot password:**
   - Go to http://localhost:5173/auth
   - Click "Forgot Password?"
   - Enter your email
   - Check your email inbox!

3. **Check console:**
   - In development mode, the reset link is also logged to console
   - Look for "=== PASSWORD RESET LINK ===" in backend terminal

## 📁 Backend File Structure

```
backend/
├── server.js              # Main server file
├── services/
│   └── emailService.js    # SendGrid email service
├── package.json           # Dependencies
├── .env                   # Your secrets (DO NOT COMMIT!)
├── .env.example          # Template for .env
└── README.md             # This file
```

## 🔒 Security Features

✅ Rate limiting (3 requests per hour per IP)
✅ Token expiration (1 hour)
✅ One-time use tokens
✅ Secure random token generation
✅ CORS enabled
✅ Input validation

## 🚀 Production Deployment

For production, you'll need to:

1. **Add a database** (MongoDB, PostgreSQL, etc.)
2. **Hash passwords** with bcrypt
3. **Use HTTPS** (required by SendGrid)
4. **Set environment variables** on your hosting platform
5. **Update FRONTEND_URL** to your production domain

## 📝 API Endpoints

### POST /api/forgot-password
```json
Request:
{
  "email": "user@example.com"
}

Response:
{
  "message": "Password reset email sent successfully"
}
```

### POST /api/reset-password
```json
Request:
{
  "token": "abc123...",
  "newPassword": "newpassword123"
}

Response:
{
  "message": "Password reset successful"
}
```

## 🆘 Troubleshooting

**Email not sending?**
- Check SendGrid API key is correct
- Verify sender email in SendGrid dashboard
- Check console for error messages
- Ensure you're not exceeding free tier limits (100/day)

**CORS errors?**
- Make sure backend is running on port 3001
- Check CORS is enabled in server.js
- Verify frontend URL in .env

**Token expired?**
- Tokens expire after 1 hour
- Request a new reset link

## 💡 Next Steps

Once working in development:
1. Add user database integration
2. Implement password hashing
3. Add email templates for other notifications
4. Set up production environment
5. Configure custom domain for emails

## 📞 Support

Need help? Check:
- SendGrid docs: https://docs.sendgrid.com/
- Express.js docs: https://expressjs.com/
- Your backend console logs

Happy coding! 🎉
