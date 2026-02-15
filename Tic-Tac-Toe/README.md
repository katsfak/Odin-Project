# Tic-Tac-Toe

A classic Tic-Tac-Toe game with Player vs Player and Player vs Computer modes. Built as part of The Odin Project curriculum with vanilla JavaScript using factory functions and the module pattern.

## Features

### Game Modes

- **Player vs Player** - Play against a friend locally
- **Player vs Computer** - Challenge the AI with three difficulty levels

### AI Difficulty Levels

- **Easy** - Random moves with occasional smart plays (good for beginners)
- **Medium** - Balanced gameplay mixing random and optimal moves
- **Hard (Unbeatable)** - Uses the minimax algorithm for perfect play

### Additional Features

- ✅ Custom player names
- ✅ Win detection for all 8 possible winning combinations
- ✅ Tie detection
- ✅ Winning cell highlighting with animation
- ✅ Game restart functionality
- ✅ Responsive design for mobile and desktop
- ✅ Beautiful gradient UI with smooth animations

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and flexbox/grid
- **Vanilla JavaScript (ES6+)** - Object-oriented design patterns:
  - Factory functions for creating players
  - Module pattern (IIFE) for singleton objects
  - Minimax algorithm for AI logic

## How to Play

1. Open [index.html](index.html) in your web browser
2. Select your game mode:
   - **Player vs Player** - Play with a friend
   - **Player vs Computer** - Play against the AI
3. Enter player name(s)
4. If playing vs computer, choose difficulty level
5. Click **Start Game**
6. Players take turns clicking cells to place their mark (X or O)
7. First player to get 3 in a row wins!
8. Click **Restart Game** to play again

## Game Rules

- Players alternate placing their marks (X and O) on a 3x3 grid
- Win by getting three marks in a row horizontally, vertically, or diagonally
- If all 9 cells are filled with no winner, the game is a tie
- In computer mode, the player always goes first as X

## Code Architecture

The project follows best practices for JavaScript organization:

### Modules

**Player (Factory Function)**

```javascript
const Player = (name, symbol) => {
  return { name, symbol };
};
```

**Gameboard (Module Pattern)**

- Manages the board array
- Controls cell placement
- Handles board reset

**Game (Module Pattern)**

- Controls game flow and state
- Checks for wins and ties
- Manages player turns
- Handles computer mode logic

**ComputerAI (Module Pattern)**

- Implements minimax algorithm for optimal moves
- Adjusts strategy based on difficulty level
- Evaluates all possible game outcomes

**DisplayController (Module Pattern)**

- Handles all DOM manipulation
- Manages UI updates
- Controls game mode selection
- Implements computer move delays for better UX

## Minimax Algorithm

The unbeatable AI uses the minimax algorithm, a recursive decision-making algorithm that:

1. Evaluates all possible future game states
2. Assigns scores to terminal states:
   - +10 for computer win
   - -10 for human win
   - 0 for tie
3. Maximizes the computer's score while minimizing the player's score
4. Chooses the move that leads to the best possible outcome

The algorithm accounts for win depth, preferring faster wins and slower losses.

## Project Structure

```
Tic-Tac-Toe/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Game logic and AI
└── README.md           # Project documentation
```

## Learning Objectives

This project demonstrates:

- **Object-oriented design** with factory functions and modules
- **Minimal global scope** - all code tucked inside factories/IIFEs
- **Separation of concerns** - distinct modules for game logic vs display
- **Advanced algorithms** - implementing minimax for AI
- **Clean code principles** - readable, maintainable, well-organized code
- **DOM manipulation** - dynamic UI updates without frameworks
- **Event handling** - managing user interactions
- **Game state management** - tracking and updating game status

## Challenges Overcome

1. Implementing an unbeatable AI using minimax algorithm
2. Organizing code with minimal global variables
3. Separating game logic from DOM manipulation
4. Adding computer move delays for better user experience
5. Creating a responsive and intuitive UI

## Future Enhancements

Potential improvements:

- Score tracking across multiple games
- Animations for X and O placement
- Sound effects
- Online multiplayer mode
- Board size customization (4x4, 5x5)
- Game history/replay functionality

## Acknowledgments

Built following The Odin Project curriculum guidelines for creating a modular, well-structured Tic-Tac-Toe game.

---

_Part of The Odin Project - JavaScript Course_
