# CodeHarana - Software Development Company Website

A modern, responsive website for CodeHarana (codeharana.com) - a software development company offering Web, iOS, Android, and WordPress services.

## The Story Behind CodeHarana

**Harana** is a traditional Filipino courtship custom where a man serenades a woman by singing love songs outside her window at night, often with friends accompanying him on guitar, expressing sincere affection in a public yet respectful manner that involves the woman's family.

Like this beautiful tradition, CodeHarana courts your business success with dedication, sincerity, and craftsmanship - serenading your digital needs with exceptional code and unwavering commitment to excellence.

## Features

- **Modern Design**: Clean, professional design with gradient accents and smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Service Showcase**: Dedicated sections for Web, iOS, Android, and WordPress development
- **Contact Form**: Interactive quote request form with multi-currency support and flexible budget (minimum ₱10,000)
- **Smooth Animations**: Scroll-based animations and interactive hover effects
- **Performance Optimized**: Fast loading and smooth scrolling
- **Multi-Currency Support**: Accepts quotes in PHP, USD, EUR, GBP, AUD, CAD, and SGD

## Sections

1. **Navigation**: Fixed navbar with smooth scroll links
2. **Hero Section**: Eye-catching intro with statistics and floating cards
3. **Services**: Four service cards showcasing your offerings
4. **About**: Why choose your company with key features
5. **Contact Form**: Quote request form with all necessary fields
6. **Footer**: Company info and quick links

## Getting Started

Simply open the `index.html` file in your web browser:

```bash
open index.html
```

Or start a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Update Company Information

Edit the `index.html` file to update:
- Contact details (email: hello@codeharana.com, phone, address)
- Service descriptions
- Statistics in the hero section
- Team member information

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* Modify these to match your brand */
}
```

### Form Submission

The form currently logs data to the console. To connect it to your backend:

1. Open `script.js`
2. Find the form submission handler
3. Replace the simulated API call with your actual endpoint:

```javascript
// Replace this:
await new Promise(resolve => setTimeout(resolve, 2000));

// With your API call:
const response = await fetch('your-api-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript
- Google Fonts (Inter)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use and customize for your business.
