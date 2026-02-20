# Personal Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and vanilla JavaScript. This project showcases a full-stack developer's work, skills, and contact information with a clean, professional design.

## Features

✨ **Responsive Design**

- Fully responsive layout that works seamlessly from 320px to 1920px viewports
- Mobile-first approach with flexible grid and flexbox layouts
- Adaptive typography using CSS `clamp()` for fluid scaling

💎 **Modern UI/UX**

- Clean and professional design with smooth animations
- Hover effects and transitions throughout
- Intersection Observer API for scroll-based animations
- Sticky navigation header with smooth scroll behavior

📱 **Mobile Optimized**

- Touch-friendly navigation and interactive elements
- Optimized images from Pexels for fast loading
- Proper spacing and sizing for all device sizes

🎨 **Design System**

- Color-coded sections (primary, secondary, accent colors)
- Consistent typography using Playfair Display and Roboto fonts
- Smooth transitions and transforms throughout

🔗 **Social Integration**

- Links to GitHub, LinkedIn, and X (Twitter)
- Professional contact information
- Social media icons with hover animations

## Sections

### Header & Navigation

- Sticky navigation bar with smooth scrolling
- Quick links to Projects, About, and Contact sections
- Active link highlighting on scroll

### Hero Section

- Eye-catching introduction with profile image
- Call-to-action buttons for projects and contact
- Responsive two-column layout

### Featured Projects

- Grid layout showcasing 3 featured projects
- Project images, descriptions, and technology stacks
- Links to project demos and GitHub repositories
- Hover animations for visual feedback

### About Section

- Personal introduction and professional summary
- Technical skills organized by category:
  - Frontend (HTML, CSS, JavaScript, React, Responsive Design)
  - Backend (Node.js, Express, PostgreSQL, MongoDB)
  - Tools (Git, Webpack, Jest, VS Code)

### Contact Section

- Contact methods (Phone, Email, Message)
- Social media links with icon buttons
- Professional call-to-action

### Footer

- Copyright information
- Personal credit/attribution

## Technology Stack

**Frontend**

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)

**Fonts**

- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) - Display font
- [Roboto](https://fonts.google.com/specimen/Roboto) - Body font

**Icons**

- [Material Design Icons](https://materialdesignicons.com/) - Icons for contact methods
- [DevIcon](https://devicon.dev/) - Social media icons

**Images**

- [Pexels](https://www.pexels.com/) - Stock photos

## Responsive Breakpoints

The site is optimized for the following breakpoints:

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1200px
- **Large Desktop**: 1200px - 1920px
- **Extra Large**: 1920px and above

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Open the project:

```bash
# Open with VS Code
code .

# Or simply open index.html in your browser
```

3. Update the content:
   - Replace placeholder images with your own photos
   - Update project information in the Projects section
   - Add your actual contact information
   - Update social media links
   - Customize colors in the CSS variables

## Customization

### Colors

Edit the CSS custom properties in `style.css`:

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #e74c3c;
  --accent-color: #3498db;
  /* ... more colors ... */
}
```

### Fonts

Google Fonts are automatically loaded in the HTML. To change fonts:

1. Visit [Google Fonts](https://fonts.google.com/)
2. Select your fonts
3. Replace the font URLs in the `<head>` section of `index.html`
4. Update the font family names in the CSS variables

### Projects

To add or modify projects:

1. Edit the Projects section in `index.html`
2. Add or remove `.project-card` elements
3. Update image sources, descriptions, and links

### Skills

To update technical skills:

1. Edit the skill categories in the About section
2. Add or remove skill items as needed

## Features Explained

### Smooth Scrolling

Navigation links use smooth scroll behavior for a polished user experience.

### Scroll Animations

Elements fade in and slide up as they enter the viewport using the Intersection Observer API.

### Lazy Loading

Images can be lazy-loaded to improve performance (optional).

### Performance

- Optimized CSS with minimal repaints
- Efficient JavaScript using debouncing
- Responsive images with appropriate sizing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Color contrast ratios that meet WCAG standards
- Keyboard navigation support
- Focus states on interactive elements

## Deployment

### GitHub Pages

1. Push your code to GitHub:

```bash
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll to "GitHub Pages" section
   - Select "main" branch as the source
   - Your site will be published at `https://yourusername.github.io/portfolio`

3. Custom domain (optional):
   - Add a CNAME file with your domain
   - Update DNS settings with your provider

### Other Hosting Options

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Similar to Netlify with great performance
- **Firebase Hosting**: Google's hosting solution
- **Traditional Hosting**: Upload files via FTP

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Blog section with articles
- [ ] Contact form with email integration
- [ ] Project filtering by technology
- [ ] Testimonials section
- [ ] Animation enhancements
- [ ] PWA capabilities

## Performance Tips

1. **Images**: Optimize and compress images before use
2. **Fonts**: Use system fonts as fallbacks
3. **CSS**: Minify CSS for production
4. **JavaScript**: Consider minifying JS for production
5. **CDN**: Serve assets through a CDN for faster load times

## Tips for Success

✅ **Keep it Simple**: A clean design is more professional than a cluttered one

✅ **Update Regularly**: Keep your portfolio fresh with new projects

✅ **Tell Your Story**: Make your about section personal and engaging

✅ **Mobile First**: Always test on mobile devices

✅ **SEO**: Add meta tags for better search engine visibility

✅ **Analytics**: Consider adding Google Analytics to track visitors

✅ **Networking**: Share your portfolio on LinkedIn and relevant communities

## License

This project is open source and available under the MIT License. Feel free to use it as a template for your own portfolio.

## Contributing

Suggestions and improvements are welcome! Feel free to fork this project and submit pull requests.

## Author

Created as part of The Odin Project curriculum.

---

**Remember**: Your portfolio is a reflection of your work and professionalism. Keep it updated, maintain clean code, and showcase your best projects. Good luck! 🚀
