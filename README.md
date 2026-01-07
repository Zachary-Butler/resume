# Zachary Butler - Resume

A modern, responsive HTML resume with dark/light mode toggle and print optimization.

## Features

- **Clean, Minimalist Design** - Professional single-page layout inspired by modern resume best practices
- **Dark/Light Mode** - Toggle between themes with automatic system preference detection
- **Responsive** - Optimized for desktop, tablet, and mobile viewing
- **Print-Friendly** - Dedicated print styles for clean PDF/paper output
- **Accessible** - Semantic HTML, ARIA labels, and keyboard navigation support
- **PDF Download** - Link to download PDF version of resume

## Live Demo

[View Live Resume](https://your-username.github.io/resume) _(Update with your GitHub Pages URL)_

## Local Development

Since this is a static HTML site with no build process, you can simply open `index.html` in your browser.

For a better development experience with live reload, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Project Structure

```
resume/
├── index.html          # Main HTML file
├── css/
│   ├── theme.css      # Theme variables and toggle button styles
│   └── style.css      # Main styles, layout, and print styles
├── js/
│   └── theme-toggle.js # Theme switching logic
├── assets/
│   └── Zachary Butler Resume 2025.pdf  # PDF version for download
├── README.md
└── .gitignore
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables), Grid, Flexbox
- **JavaScript (ES6+)** - Theme toggle with localStorage
- **No frameworks or dependencies** - Pure vanilla web technologies

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/" (root) folder
5. Click Save
6. Your resume will be available at `https://your-username.github.io/resume`

### Optional: Custom Domain

To use a custom domain (e.g., ctrlz.cc):

1. Add a `CNAME` file to the root with your domain
2. Configure DNS settings with your domain provider
3. See [GitHub Pages custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Updating Content

To update your resume:

1. Edit the content in `index.html`
2. Update the PDF file in `assets/` if needed
3. Commit and push changes to GitHub
4. Changes will automatically deploy to GitHub Pages

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Zachary Butler**
- Email: zacharybutler@gmail.com
- Website: [ctrlz.cc](https://ctrlz.cc)
- LinkedIn: [linkedin.com/in/zachary-butler](https://linkedin.com/in/zachary-butler)
