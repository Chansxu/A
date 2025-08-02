# MetaBiome - HTML/CSS/JavaScript Version

This is a converted version of the MetaBiome Next.js project to plain HTML, CSS, and JavaScript. The website is now a static site that can be opened directly in any web browser without requiring Node.js or any build tools.

## Features

- **Homepage** (`index.html`) - Landing page with feature cards and call-to-action
- **Onboarding** (`onboarding.html`) - Multi-step user onboarding process
- **Dashboard** (`dashboard.html`) - Main user dashboard with progress tracking and mood check-ins
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Local Storage** - User data is saved locally in the browser
- **Interactive Elements** - Mood tracking, progress bars, and animated components

## How to Use

1. **Open the website**: Simply open `index.html` in any modern web browser
2. **Start onboarding**: Click "Get Started" to begin the onboarding process
3. **Complete setup**: Follow the 3-step onboarding to set up your profile
4. **Use the dashboard**: After onboarding, you'll be redirected to the dashboard
5. **Track your progress**: Use the mood check-ins and progress tracking features

## File Structure

```
├── index.html          # Homepage
├── onboarding.html     # Onboarding page
├── dashboard.html      # Dashboard page
├── styles.css          # All CSS styles
├── script.js           # Main JavaScript functionality
├── onboarding.js       # Onboarding page JavaScript
├── dashboard.js        # Dashboard page JavaScript
└── README.md           # This file
```

## Pages

### Homepage (`index.html`)
- Hero section with call-to-action
- Feature cards explaining the app's benefits
- Navigation to onboarding

### Onboarding (`onboarding.html`)
- Step 1: Name and age input
- Step 2: Goal selection (multiple choice)
- Step 3: Completion message
- Progress indicators
- Data saved to localStorage

### Dashboard (`dashboard.html`)
- Welcome message with user's name
- Progress tracking cards
- Mood check-in system
- Quick action cards for different features
- Bottom navigation

## Data Storage

The app uses browser localStorage to save:
- User profile data (name, age, goals)
- Mood history
- Progress data
- Daily task completion

## Browser Compatibility

This website works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Customization

You can easily customize the website by:
- Modifying colors in `styles.css`
- Adding new pages by creating new HTML files
- Extending functionality in the JavaScript files
- Adding new features to the dashboard

## No Dependencies

This version has no external dependencies and doesn't require:
- Node.js
- npm or yarn
- Build tools
- Package managers

Simply open `index.html` in your browser to start using the website! 