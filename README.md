# Triangle Display Application

A React-based interactive application for displaying triangles and calculating their angles - developed as a technical exercise.

## Project Description

An interactive application that allows users to input three points in 2D space and view the resulting triangle, including calculation and display of all angles.

### Key Features

- **Point Input Interface**: User-friendly form for entering 3 points (A, B, C) with X and Y coordinates
- **Triangle Visualization**: Graphical display of the triangle on an 800x600px canvas
- **Angle Calculation**: Automatic calculation of all three angles using the law of cosines
- **Angle Marking**: Visual marking of each angle with colored curved lines
- **Angle Values Display**: Display of angle values inside the triangle with white background circles
- **Auto-scaling**: Automatic scaling to fit the triangle within the canvas bounds
- **Triangle Type Detection**: Automatic determination of triangle type (acute, right, obtuse)

## Project Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/triangle-display.git
cd triangle-display

# Install dependencies
npm install

# Run the project in development mode
npm start
```

The project will open in your browser at: `http://localhost:3000`

### Running Tests

```bash
npm test
```

### Production Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/              # React components
│   ├── InputPage/          # Point input page
│   ├── DisplayPage/        # Triangle display page
│   ├── PointInput/         # Individual point input component
│   ├── TriangleCanvas/     # Canvas component for triangle drawing
│   └── AngleCard/          # Angle display card
├── hooks/                  # Custom React hooks
│   └── useTriangleCalculations.js
├── App.js                  # Main application component
├── App.css                 # Application styles
├── index.js                # Entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 18** - UI library
- **Canvas API** - Graphical drawing of the triangle
- **CSS3** - Styling and animations
- **JavaScript ES6+** - Logic and mathematical calculations

## Technical Implementation

### 1. Triangle Drawing Method

I chose to use the **Canvas API** for several reasons:
- Excellent performance for graphical drawing
- Full control over rendering and animations
- Built-in support for complex geometric shapes
- Ability to draw curved lines for angle marking

### 2. Angle Calculation

I used the **Law of Cosines** to calculate angles:

```javascript
// Calculate side lengths
const a = distance(B, C);  // BC
const b = distance(A, C);  // AC  
const c = distance(A, B);  // AB

// Law of cosines: cos(A) = (b² + c² - a²) / (2bc)
const angleA = Math.acos((b*b + c*c - a*a) / (2*b*c));
```

### 3. Key Challenges Solved

- **Auto-scaling algorithm** to fit triangles within canvas bounds
- **Optimal text positioning** for angle values inside the triangle
- **Curved line drawing** for angle marking with proper interior angles
- **Responsive design** for mobile compatibility

### 4. Features Added Beyond Requirements

- **Triangle type identification** - automatic classification as acute/right/obtuse
- **Reset to defaults** - option to return to predefined values
- **Visual input validation** - visual feedback on input fields
- **Coordinate display** - clear display of entered points
- **Responsive design** - mobile-friendly interface

### 5. **I used Development Tools & AI Assistance - Claude Sonnet 4 Integration**

This project was developed with assistance from **Claude Sonnet 4**, currently the most advanced AI model for code development and software engineering.

**Key Benefits:**
- **Industry-leading accuracy** in code generation and architectural planning
- **Enhanced productivity** - faster development cycles with higher quality output
- **Professional-grade capabilities** for complex, production-ready applications

**How Claude Enhanced Development:**
- **Architecture Planning**: Modular React component structure and clean separation of concerns
- **Mathematical Validation**: Correct implementation of geometric calculations (law of cosines)
- **Performance Optimization**: Improved Canvas rendering and angle drawing accuracy
- **Rapid Debugging**: Quick resolution of complex geometric rendering issues

This approach demonstrates how modern AI tools can enhance developer productivity while maintaining high code quality and professional standards.

## Example Test Cases

### 1. **Right Triangle** (should have a 90° angle)
```
A: (0, 0)
B: (300, 0) 
C: (0, 400)
```
**Expected result:** Angle A = 90°, two acute angles

### 2. **Equilateral Triangle** (all angles = 60°)
```
A: (400, 100)
B: (600, 100)
C: (500, 273)
```
**Expected result:** A = B = C = 60°

### 3. **Isosceles Triangle**
```
A: (400, 100)
B: (600, 100)
C: (500, 300)
```
**Expected result:** Angles B and C equal, angle A different

### 4. **Obtuse Triangle** (one angle > 90°)
```
A: (100, 300)
B: (700, 350)
C: (150, 600)
```
**Expected result:** One angle > 90°

## How to Use

1. **Enter Points**: Input X and Y values for three points
2. **Display Triangle**: Click "Show Triangle" button
3. **View Results**: See the triangle, angles, and statistical data

## Technical Decisions

### Why Canvas over SVG?
- Better performance for dynamic drawing
- More suitable for mathematical visualizations
- Built-in arc drawing capabilities
- Easier integration with React

### Why Law of Cosines?
- Works for all triangle types (including obtuse)
- Mathematically stable formula
- Provides accurate results

### Component Architecture
- **Modular design** with separate components for each feature
- **Custom hooks** for mathematical calculations
- **Clean separation** between UI and logic

## Development Process

This project was developed as a technical exercise with the following approach:
- **Iterative development** - started with basic triangle, added features gradually
- **Component-driven design** - broke down into reusable components
- **Mathematical accuracy** - ensured correct geometric calculations
- **User experience focus** - prioritized clear, intuitive interface

## License

MIT License - see LICENSE file for details.

## Author

Developed as a technical exercise demonstrating React development, mathematical computation, and Canvas API usage.

---

**Note**: This is a technical exercise project intended for demonstration purposes.
