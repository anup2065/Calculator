# Advanced Calculator Web Application

## Overview
An interactive, feature-rich calculator web application built with HTML, CSS, and JavaScript (jQuery). This responsive calculator performs basic and advanced arithmetic operations with comprehensive error handling, keyboard support, and calculation history tracking.

## Project Architecture
- **Type**: Static web application
- **Frontend**: HTML/CSS/JavaScript with jQuery
- **Build System**: None required (static files)
- **Server**: Python HTTP server serving on port 5000

## Project Structure
```
.
├── index.html       # Main HTML page with enhanced calculator UI
├── script.js        # jQuery-based calculator logic with all features
├── style.css        # Responsive styling for all devices
├── background.jpg   # Background image asset
├── replit.md        # Project documentation
└── README.md        # Project information
```

## Features

### Basic Operations
- Addition (+)
- Subtraction (-)
- Multiplication (×)
- Division (÷)
- Modulus (%)

### Advanced Operations
- **Percentage Calculation**: Calculate X% of Y (e.g., 20% of 100 = 20)
- **Power/Exponent**: Calculate X raised to the power of Y (X^Y)
- **Negative Toggle**: +/- buttons to quickly make numbers negative or positive

### User Experience Features
- **Clear Button**: Reset all inputs and start fresh (Keyboard: Esc)
- **Keyboard Support**: 
  - Enter: Calculate using last operation
  - Esc: Clear all
  - +, -, *, /, %: Perform respective operations
- **Error Handling**: 
  - Division by zero prevention
  - Empty field validation
  - Invalid input detection
- **Decimal Precision**: Results formatted to 10 decimal places
- **Copy Result**: One-click copy to clipboard
- **Use Result**: Transfer result to Number 1 for next calculation
- **Calculation History**: 
  - Shows last 10 calculations
  - Click any history item to restore that result
  - Timestamps for each calculation
  - Clear history option

### Responsive Design
- **Mobile Phones**: Full-width buttons, optimized touch targets
- **Tablets**: Grid layout with balanced spacing
- **Desktops**: Beautiful rounded design with side-by-side layout
- Fully responsive inputs and buttons using clamp() for fluid typography
- Smooth hover effects and animations

## Recent Changes
- 2025-10-19: Initial setup for Replit environment
  - Configured Python HTTP server on port 5000
  - Set up workflow for static file serving
  - Configured deployment settings
- 2025-10-19: Enhanced with comprehensive feature set
  - Added all basic features (Clear, keyboard support, error handling, precision control)
  - Added helpful additions (history panel, copy result, use result, negative toggle, percentage, power)
  - Maintained full responsive design across all devices
  - Fixed percentage calculation to properly compute "X% of Y"

## Development
The application runs on a simple Python HTTP server serving static files on port 5000. The server is configured to serve on 0.0.0.0 to work with Replit's proxy system.

## Dependencies
- jQuery 3.7.1 (loaded via CDN)
- Google Fonts (Lobster Two, Dancing Script, Lobster)

## Deployment
Ready for deployment using Replit's autoscale deployment target, which is perfect for this static web application.
