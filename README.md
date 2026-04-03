# ETM Cleaning Website

Professional commercial cleaning services website for Excuse The Mess Cleaning, LLC - serving the Greater Austin Area.

## 🧹 About

ETM Cleaning specializes in commercial janitorial and window cleaning services for businesses across the Greater Austin Area. This is the official website showcasing our services and providing an easy way for potential clients to request quotes.

## ✨ Features

- **Modern, Responsive Design** - Looks great on desktop, tablet, and mobile devices
- **Smooth Animations** - Professional fade-in effects and transitions
- **Contact Form Integration** - Connected to Formspree for reliable form submissions
- **Input Sanitization** - Client-side validation and security measures
- **SEO Optimized** - Structured data, meta tags, and local business schema
- **Accessibility** - Semantic HTML and proper ARIA labels
- **Performance** - Minimal dependencies, fast loading times

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS Grid and Flexbox, smooth animations
- **Vanilla JavaScript** - Form handling, validation, and sanitization
- **Formspree** - Form submission backend service
- **Google Fonts** - Bebas Neue and DM Sans typography

## 📂 File Structure

```
etmcleaning/
├── index.html          # Main HTML file
├── script.js           # JavaScript for form handling and validation
├── etm-logo.png        # Company logo
├── etm-favicon.png     # Browser favicon
└── README.md           # This file
```

## 🚀 Getting Started

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/etmcleaning.git
   cd etmcleaning
   ```

2. Open `index.html` in your browser:
   ```bash
   # On Windows
   start index.html
   
   # On Mac
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

3. Or use a local server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use VS Code Live Server extension
   ```

### Deployment

This is a static website that can be deployed to:
- **GitHub Pages** (free)
- **Netlify** (free tier available)
- **Vercel** (free tier available)
- Any web hosting service that supports static sites

## 📝 Configuration

### Dynamic Google Review Count

The site can pull live Google review counts on page load via a Cloudflare Pages Function.

Required environment variables:

- GOOGLE_PLACES_API_KEY
- GOOGLE_PLACE_ID

How it works:

1. Frontend requests /api/reviews.
2. Cloudflare Pages runs functions/api/reviews.js for that route.
3. The function calls Google Places API and returns userRatingCount.
4. script.js updates the Reviews text in the badge.

Files involved:

- functions/api/reviews.js
- script.js

### Updating Formspree Endpoint

To change the form submission endpoint:

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form and get your endpoint URL
3. Update the `action` attribute in `index.html`:
   ```html
   <form name="contact" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Customizing Content

- **Contact Information**: Update phone number and email in `index.html`
- **Services**: Modify the services section in `index.html`
- **Colors**: Edit CSS custom properties in the `:root` section
- **Fonts**: Change Google Fonts imports in the `<head>` section

## 🎨 Color Scheme

```css
--black:  #0e0e0e;        /* Background */
--white:  #f5f2ee;        /* Text */
--accent: #7499bc;        /* Brand blue */
--accent-light: #a3bdd4;  /* Light blue */
--mid:    #1e1e1e;        /* Mid-tone */
--card:   #242424;        /* Card backgrounds */
--text-muted: #777;       /* Muted text */
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Features

- Input sanitization on all form fields
- XSS protection
- Email and phone validation
- Character limits on text inputs
- HTML tag stripping

## 📞 Contact

**Excuse The Mess Cleaning, LLC**
- Phone: (512) 643-3650
- Email: etmcbusiness@gmail.com
- Service Area: Greater Austin Area, Texas

## 📄 License

Copyright © 2026 Excuse The Mess Cleaning, LLC. All rights reserved.

---

Built with ❤️ for Austin businesses
