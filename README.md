
# React Spreadsheet Engine

A lightweight, Excel-like spreadsheet application built with React. Supports formula evaluation, automatic dependency tracking, and circular reference detection.

![Spreadsheet Demo](https://img.shields.io/badge/React-18.x-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- **10×10 Grid Interface** - Columns A-J, Rows 1-10
- **Formula Support** - Write formulas starting with `=`
- **Arithmetic Operations** - Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`)
- **Cell References** - Reference other cells in formulas (e.g., `=A1+B2`)
- **Parentheses Support** - Complex expressions like `=(C1+D1)/3`
- **Automatic Recalculation** - Updates propagate through dependent cells instantly
- **Circular Reference Detection** - Prevents infinite loops with `#CIRCULAR` error
- **Error Handling** - Displays `#ERROR` for invalid formulas
- **Real-time Editing** - Click any cell to edit, press Enter to confirm

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

Check your versions:
```bash
node --version
npm --version
```

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/rahuRahul-64/spreadsheet-app.git
cd spreadsheet-app/spreadsheet_clone
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:5173
```

## 📖 Usage Examples

### Basic Values
```
A1 = 5
B1 = 10
C1 = Hello
```

### Simple Formulas
```
A1 = 5
B1 = =A1+3        → Result: 8
C1 = =A1*2        → Result: 10
```

### Complex Formulas
```
A1 = 10
B1 = 20
C1 = 30
D1 = =(A1+B1+C1)/3    → Result: 20
```

### Dependency Chain
```
A1 = 5
B1 = =A1+3        → Result: 8
C1 = =B1*2        → Result: 16

Change A1 to 10:
B1 automatically updates to 13
C1 automatically updates to 26
```

### Error Handling
```
Circular Reference:
A1 = =B1
B1 = =A1         → Both show: #CIRCULAR

Invalid Formula:
C1 = =A1+        → Shows: #ERROR
```

## 🏗️ Project Structure
```
spreadsheet_clone/
├── src/
│   ├── components/
│   │   ├── SpreadsheetApp.jsx    # Main spreadsheet component
│   │   ├── Grid.jsx              # Grid layout
│   │   └── Cell.jsx              # Individual cell component
│   ├── engine/
│   │   ├── parser.jsx            # Formula parsing logic
│   │   ├── evaluator.jsx         # Formula evaluation
│   │   ├── dependencyGraph.jsx   # Dependency tracking
│   │   └── topologicalSort.js    # Recalculation ordering
│   ├── state/
│   │   └── spreadsheetReducer.js # State management
│   ├── utils/
│   │   └── constants.js          # Grid constants
│   ├── styles/
│   │   └── spreadsheet.css       # Styling
│   ├── App.jsx                   # Root component
│   ├── App.css                   # App styles
│   └── main.jsx                  # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🧠 Architecture

### State Management
The application uses React's `useReducer` hook for centralized state management:
- **cells**: Stores raw input and computed values for each cell
- **dependencies**: Tracks which cells depend on each cell (forward graph)
- **dependents**: Tracks what each cell depends on (backward graph)

### Formula Evaluation
1. **Parse**: Extract cell references from formula
2. **Validate**: Check for circular references
3. **Substitute**: Replace cell references with values
4. **Calculate**: Evaluate the expression
5. **Propagate**: Update dependent cells in topological order

### Circular Reference Detection
Uses Depth-First Search (DFS) algorithm to detect cycles in the dependency graph before evaluation.

### Topological Sort
Determines the correct order to recalculate cells when a dependency changes.

## 🧪 Testing Examples

Try these scenarios to test the functionality:

**Test 1: Basic Math**
```
A1 = 10
A2 = 20
A3 = =A1+A2     → Expected: 30
```

**Test 2: Chained Dependencies**
```
A1 = 5
B1 = =A1*2      → Expected: 10
C1 = =B1+5      → Expected: 15
D1 = =C1/3      → Expected: 5
```

**Test 3: Circular Reference**
```
A1 = =B1
B1 = =C1
C1 = =A1        → Expected: All show #CIRCULAR
```

**Test 4: Complex Expression**
```
A1 = 100
B1 = 50
C1 = =(A1+B1)*2/3    → Expected: 100
```

## 🔧 Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎯 Core Features Implementation

### ✅ Completed Features
- [x] 10×10 grid with column/row labels
- [x] Formula evaluation with basic arithmetic
- [x] Cell reference support
- [x] Dependency tracking
- [x] Automatic recalculation
- [x] Circular reference detection
- [x] Error handling
- [x] Parentheses support

### 🚀 Future Enhancements (Bonus)
- [ ] Undo/Redo functionality
- [ ] Dynamic grid sizing
- [ ] Additional functions (SUM, AVG, MAX, MIN)
- [ ] Cell formatting (bold, colors)
- [ ] Copy/Paste support
- [ ] Export to CSV/Excel
- [ ] Keyboard navigation (arrow keys)

## 🐛 Known Issues

- Formula parser uses `Function()` for evaluation (safe in controlled environment)
- No persistent storage (data lost on refresh)
- Limited to 10×10 grid size

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Rahul](https://github.com/Rahul-64)
- LinkedIn: [Your Profile](www.linkedin.com/in/rahul-kumar-3b9b41273)

## 🙏 Acknowledgments

- Inspired by Excel and Google Sheets
- Built as part of Software Developer Intern Task
- React documentation and community

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: kumarrahul123098@gmail.com

---

⭐ **If you found this project helpful, please give it a star!** ⭐
