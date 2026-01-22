# Form Integration Guide

## Current Implementation
The form is now set up to use **Web3Forms** (easiest option). See other options below if you prefer a different approach.

---

## Option 1: Web3Forms (Currently Implemented) ✅

**Pros:** Free, no backend needed, simple setup
**Cost:** Free for 250 submissions/month

### Setup Steps:
1. Go to [web3forms.com](https://web3forms.com)
2. Sign up with your email (hello@codeharana.com)
3. Get your Access Key
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `script.js` with your actual key
5. Done! Submissions will be sent to hello@codeharana.com

---

## Option 2: EmailJS

**Pros:** Free tier available, email templates, good documentation
**Cost:** Free for 200 emails/month

### Setup Steps:
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Install EmailJS SDK in your HTML:

```html
<!-- Add before closing </body> tag in index.html -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

5. Replace the fetch call in script.js:

```javascript
// Replace the Web3Forms fetch with this:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || 'Not provided',
    company: data.company || 'Not provided',
    service: data.service,
    budget: `${currencySymbol}${budgetFormatted} ${currency}`,
    message: data.message
}).then(
    (response) => {
        console.log('SUCCESS!', response.status, response.text);
    },
    (error) => {
        throw new Error('Failed to send email');
    }
);
```

---

## Option 3: Custom Backend API

**Pros:** Full control, can store in database, advanced logic
**Cost:** Depends on hosting

### A. Node.js + Express Example

Create a simple backend server:

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'hello@codeharana.com',
        pass: 'your-app-password' // Use app-specific password
    }
});

app.post('/api/quote', async (req, res) => {
    const { name, email, phone, company, service, currency, budget, message } = req.body;

    const mailOptions = {
        from: 'hello@codeharana.com',
        to: 'hello@codeharana.com',
        subject: `New Quote Request from ${name}`,
        html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${currency} ${budget}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Quote request sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send quote request' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

Then update script.js to use your backend:

```javascript
const response = await fetch('http://localhost:3000/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

---

## Option 4: Serverless Functions (Netlify/Vercel)

**Pros:** Auto-scaling, free tier, no server management
**Cost:** Free for most small sites

### Netlify Functions Example

Create `netlify/functions/submit-quote.js`:

```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: 'hello@codeharana.com',
            subject: `New Quote Request from ${data.name}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Service: ${data.service}
Budget: ${data.currency} ${data.budget}
Message: ${data.message}
            `
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
};
```

Update script.js:

```javascript
const response = await fetch('/.netlify/functions/submit-quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

---

## Option 5: Google Sheets (Free Data Storage)

**Pros:** Free, easy to view submissions in spreadsheet
**Cost:** Free

Use the [SheetDB API](https://sheetdb.io) or [Google Apps Script](https://developers.google.com/apps-script) to save submissions to Google Sheets.

---

## Recommended Approach

For CodeHarana, I recommend starting with **Web3Forms** (already implemented) because:
- ✅ Zero setup time (just add your access key)
- ✅ No backend required
- ✅ Reliable email delivery
- ✅ Free for 250 submissions/month
- ✅ Easy to switch to another solution later

### Next Steps:
1. Go to https://web3forms.com
2. Sign up with hello@codeharana.com
3. Copy your Access Key
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in script.js (line 377)
5. Test the form!

---

## Testing the Form

Before going live:
1. Open your website
2. Fill out the quote form with test data
3. Submit the form
4. Check hello@codeharana.com for the email
5. Verify all fields are included correctly

---

## Security Notes

- Never commit API keys to Git (use environment variables for production)
- Consider adding reCAPTCHA to prevent spam (Web3Forms supports this)
- Add rate limiting if using custom backend
- Validate all inputs on the server side
