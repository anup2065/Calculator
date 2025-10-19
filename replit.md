# Advanced Calculator Web Application

## Overview
A traditional-style calculator web application built with HTML, CSS, and JavaScript (jQuery). Features a single display with number pad and operator buttons, just like a real calculator. Includes comprehensive error handling, keyboard support, and calculation history tracking.

## Project Architecture
- **Type**: Static web application
- **Frontend**: HTML/CSS/JavaScript with jQuery
- **Build System**: None required (static files)
- **Server**: Python HTTP server serving on port 5000

## Project Structure
```
.
├── index.html       # Traditional calculator UI with number pad
├── script.js        # Calculator logic with sequential operations
├── style.css        # Dark-themed responsive calculator styling
├── background.jpg   # Background image asset
├── replit.md        # Project documentation
└── README.md        # Project information
```

## Features

### Traditional Calculator Interface
- **Single Display**: Shows current value and operation preview
- **Number Pad**: Buttons 0-9 for entering numbers
- **Operator Buttons**: +, -, ×, ÷ (orange buttons on the right)
- **Advanced Operations**: Power (x^y) and Modulus
- **Special Buttons**:
  - **C** (Clear): Reset everything
  - **⌫** (Backspace): Delete last digit
  - **%** (Percent): Context-aware percentage calculations
  - **+/-**: Toggle positive/negative
  - **.** (Decimal): Add decimal point
  - **=** (Equals): Calculate result

### How to Use
1. Click numbers to enter a value (or type on keyboard)
2. Click an operator button (+, -, ×, ÷)
3. Click more numbers
4. Click **=** to see the result

### Smart Percentage Calculations
- **With Addition/Subtraction**: Calculates percentage of first number
  - Example: 50 + 10% = 55 (adds 10% of 50)
  - Example: 100 - 20% = 80 (subtracts 20% of 100)
- **With Multiplication/Division**: Uses decimal percentage
  - Example: 50 × 10% = 5 (multiplies by 0.1)
  - Example: 50 ÷ 10% = 500 (divides by 0.1)
- **Standalone**: Converts to decimal
  - Example: 25% = 0.25

### User Experience Features
- **Error Handling**: 
  - Division by zero prevention
  - Modulo by zero prevention
  - Clear error messages
- **Keyboard Support**: 
  - Numbers 0-9
  - Operators: +, -, *, /, %
  - Enter or = to calculate
  - Esc to clear
  - Backspace to delete
  - Decimal point (.)
- **Decimal Precision**: Results formatted to 10 decimal places
- **Copy Result**: One-click copy to clipboard
- **Use Result**: Continue calculation with result
- **Calculation History**: 
  - Shows last 10 calculations with timestamps
  - Click any history item to use that result
  - Clear history option
  - Displays operations with % symbol when used

### Responsive Design
- **Dark Theme**: Modern calculator appearance with dark background
- **Mobile Phones**: Touch-friendly button sizes
- **Tablets**: Optimized grid layout
- **Desktops**: Side-by-side calculator and history panel
- Fully responsive across all devices

## Recent Changes
- 2025-10-19: Initial setup for Replit environment
  - Configured Python HTTP server on port 5000
  - Set up workflow for static file serving
  - Configured deployment settings
- 2025-10-19: Complete redesign to traditional calculator interface
  - Single display with number pad layout
  - Sequential operation flow (number → operator → number → equals)
  - Dark-themed modern styling
  - Context-aware percentage calculations
  - Immediate calculation on percent button press
  - History tracking with % symbol display

## Development
The application runs on a simple Python HTTP server serving static files on port 5000. The server is configured to serve on 0.0.0.0 to work with Replit's proxy system.

## Dependencies
- jQuery 3.7.1 (loaded via CDN)
- Google Fonts (Lobster Two)

## Deployment
Ready for deployment using Replit's autoscale deployment target, which is perfect for this static web application.
