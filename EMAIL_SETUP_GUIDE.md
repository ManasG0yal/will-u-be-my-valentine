# 📧 Email Setup Guide - Step by Step

## Quick Setup with EmailJS (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE)
3. Verify your email

### Step 2: Add Email Service

1. Go to the **Email Services** tab
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended)
   - Outlook
   - Yahoo
   - Or any other
4. Click **Connect Account**
5. For Gmail:
   - Click "Authorize"
   - Sign in with your Google account
   - Allow EmailJS to send emails
6. Click **Create Service**
7. **Copy your Service ID** (you'll need this!)

### Step 3: Create Email Template

1. Go to the **Email Templates** tab
2. Click **Create New Template**
3. Replace the template content with:

```
Subject: 💕 Message from Datto - Valentine's Day

From: {{from_name}}

Message:
{{message}}

---
Sent via your Valentine's Day website ❤️
```

4. Click **Save**
5. **Copy your Template ID** (you'll need this!)

### Step 4: Get Your Public Key

1. Go to **Account** tab (top right, click your profile)
2. Look for **API Keys** section
3. **Copy your Public Key** (looks like: `user_xxxxxxxxxxxxxxxxx`)

### Step 5: Update the Code

1. Open `script.js` in a text editor
2. Find line ~265 (search for "YOUR_SERVICE_ID")
3. Replace these values:

```javascript
service_id: 'service_xxxxxxx',        // Paste your Service ID
template_id: 'template_xxxxxxx',      // Paste your Template ID
user_id: 'user_xxxxxxxxxxxxxxx',      // Paste your Public Key
to_email: 'youremail@gmail.com'       // Your email address
```

4. Save the file

### Step 6: Test It!

1. Open `index.html` in your browser
2. Go through all the sections
3. Type a test message
4. Click "Send to My Heart"
5. Check your email! 📬

## 🎯 Example Configuration

Your `script.js` should look like this:

```javascript
body: JSON.stringify({
    service_id: 'service_abc123xyz',           // From Step 2
    template_id: 'template_def456uvw',         // From Step 3
    user_id: 'user_gh789ijk',                  // From Step 4
    template_params: {
        from_name: 'Datto',
        message: message,
        to_email: 'manas@example.com'          // YOUR email here
    }
})
```

## 🔧 Alternative: Simple FormSubmit (No Sign-up)

If you want something even simpler (but less customizable):

### Replace the email code in `script.js` with:

```javascript
sendBtn.addEventListener('click', async function() {
    const message = messageInput.value.trim();
    
    if (!message) {
        sendStatus.textContent = 'Please write something! 💕';
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending... 💌';

    try {
        const formData = new FormData();
        formData.append('message', `Message from Datto:\n\n${message}`);
        formData.append('_subject', '💕 Valentine Message from Datto');

        const response = await fetch('https://formsubmit.co/YOUR_EMAIL@example.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            sendStatus.textContent = '💖 Message sent! You made me the happiest! 💖';
            messageInput.value = '';
            // ... rest of success code
        }
    } catch (error) {
        sendStatus.textContent = '❌ Try again?';
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send to My Heart 💖';
    }
});
```

**Note:** FormSubmit will send you a confirmation email the first time. Click the link to activate it.

## 🚨 Troubleshooting

### "Failed to send" error

**EmailJS:**
- Double-check all IDs are correct
- Make sure there are no extra spaces
- Verify your email service is connected
- Check EmailJS dashboard for errors

**FormSubmit:**
- Make sure you confirmed the verification email
- Check spam folder
- Try a different email address

### Emails not arriving

1. Check your spam/junk folder
2. Wait 5-10 minutes (sometimes delayed)
3. Try sending a test from EmailJS dashboard
4. Verify your template is saved correctly

### CORS errors

If you see CORS errors in console:
- Use a local server (see README.md)
- Or upload to a hosting service (GitHub Pages, Netlify)
- Don't open as `file://` - use `http://`

## 📱 Testing Checklist

Before sharing with Datto:

- [ ] Email credentials configured
- [ ] Test message sent successfully
- [ ] Email received in inbox
- [ ] All sections work smoothly
- [ ] Mobile view looks good
- [ ] GIFs load properly
- [ ] Wheel spins correctly
- [ ] Slider locks at 70%
- [ ] Scroll reveals all messages
- [ ] Cards are clickable
- [ ] Final message looks beautiful

## 💡 Pro Tips

1. **Test with a dummy message first** - Don't let Datto's real message get lost!
2. **Check on your phone** - Make sure it's mobile-friendly
3. **Share as a link, not a file** - Deploy it online for best experience
4. **Save the messages** - They're precious! Screenshot or save them

## 🎁 Bonus: Email Template Ideas

Make your EmailJS template more personal:

```
Subject: 💕 Message from Datto

Hey there! 🌹

Datto just sent you a message through your Valentine's website!

━━━━━━━━━━━━━━━━━━━━
{{message}}
━━━━━━━━━━━━━━━━━━━━

Aww, how sweet! 💖

Sent with love,
Your Valentine's Day Website ❤️

P.S. Don't forget your date! 🗓️
```

## ✅ You're All Set!

Once configured, the site will:
1. Capture Datto's message
2. Send it to your email
3. Show a success animation
4. Make both of you happy! 💕

**Questions?** Double-check:
- All IDs are correct (no typos)
- You're using the right email
- Browser console for error messages (press F12)

Good luck! 🍀
