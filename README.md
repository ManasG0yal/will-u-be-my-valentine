# 💕 Valentine's Day Interactive Site for Datto

A beautiful, interactive Valentine's Day website with 4 unique question sections and email integration.

## ✨ Features

1. **Animated Envelope** - Opens to reveal the main question
2. **Fate Wheel** - Spinning wheel with only positive outcomes
3. **Love Meter Slider** - Sneaky slider that bounces back if below 70%
4. **Scroll to Agree** - Progressive reveal messages
5. **Choice Cards** - Pick your Valentine's date
6. **Message Input** - Final message that sends to your email
7. **Fully Mobile Responsive**
8. **Cute Animations** - Hearts, glows, and smooth transitions

## 🚀 Setup Instructions

### Option 1: EmailJS (Recommended - Free & Easy)

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}` - Will be "Datto"
   - `{{message}}` - The message content
   - `{{to_email}}` - Your email
4. Get your credentials:
   - Service ID
   - Template ID
   - Public Key
5. Open `script.js` and replace these lines (around line 265):

```javascript
service_id: 'YOUR_SERVICE_ID',      // Replace with your Service ID
template_id: 'YOUR_TEMPLATE_ID',    // Replace with your Template ID
user_id: 'YOUR_PUBLIC_KEY',         // Replace with your Public Key
to_email: 'YOUR_EMAIL@example.com'  // Replace with your email
```

### Option 2: Custom Backend

If you prefer to use your own backend:

1. Create a simple API endpoint that sends emails
2. Replace the fetch URL in `script.js` with your endpoint
3. Modify the request body to match your API

### Option 3: FormSubmit (No Setup Required)

For quick testing, you can use [FormSubmit.co](https://formsubit.co/):

Replace the email sending code with:

```javascript
const formData = new FormData();
formData.append('message', `From Datto: ${message}`);

const response = await fetch('https://formsubit.co/YOUR_EMAIL@example.com', {
    method: 'POST',
    body: formData
});
```

## 📱 Running the Site

### Local Development

1. Simply open `index.html` in your browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
3. Open `http://localhost:8000` in your browser

### Deploy Online (Free Options)

**GitHub Pages:**
1. Create a GitHub repository
2. Upload these files
3. Go to Settings → Pages
4. Select main branch → Save
5. Your site will be live at `username.github.io/repo-name`

**Netlify:**
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Get instant URL

**Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project folder
3. Follow prompts

## 🎨 Customization

### Change Colors
Edit `style.css` - look for gradient backgrounds like:
```css
background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
```

### Change GIFs
Replace the GIF URLs in `index.html`:
- Cat GIF: Line 32
- Sad puppy GIF: Line 117

Find more GIFs at [GIPHY.com](https://giphy.com/)

### Change Wheel Options
Edit the `options` array in `script.js`:
```javascript
const options = [
    "Definitely 💖",
    "Obviously 😌",
    "100% Yes 😍",
    "Spin Again 😉"
];
```

### Change Date Options
Edit the cards in `index.html` (lines 75-100)

## 📝 File Structure

```
valentine-datto/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

## 🐛 Troubleshooting

**Email not sending:**
- Check your EmailJS credentials are correct
- Make sure you've verified your email in EmailJS
- Check browser console for errors (F12)

**Animations not working:**
- Make sure JavaScript is enabled
- Try a different browser (Chrome recommended)
- Check browser console for errors

**Mobile issues:**
- Ensure viewport meta tag is present
- Test on actual device, not just browser resize

## 💡 Tips

- Test the email functionality before sharing with Datto!
- Make sure all GIFs load properly
- Check on mobile device for best experience
- Consider adding your own custom touch (photos, inside jokes, etc.)

## 🎁 Extra Ideas

Want to make it even more special? Try:
- Replace placeholder GIFs with photos of you two
- Add a favorite song that auto-plays
- Include more personal questions
- Add a countdown to your date
- Create a photo gallery section

## ❤️ Made with Love

Created for Datto - Have an amazing Valentine's Day! 🌹

---

**Need help?** Check:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
