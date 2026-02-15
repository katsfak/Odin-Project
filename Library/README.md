# Library

A personal library management application that allows users to keep track of their book collection. Built as part of The Odin Project curriculum.

## Features

- **Add Books**: Two ways to add books to your library
  - **API Search**: Search for books using an external API and add them with pre-filled information
  - **Manual Entry**: Manually enter book details (title, author, pages)
- **Track Reading Status**: Mark books as read or unread
- **Remove Books**: Delete books from your library
- **Persistent Storage**: Books are saved to your browser's local storage
- **Responsive Design**: Clean, card-based layout that adapts to different screen sizes

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Constructor Functions & Prototypes
- Local Storage API
- Fetch API for book search functionality

## How to Use

1. Open `index.html` in your web browser
2. Click the "Add New Book" button to open the dialog
3. Choose your preferred method:
   - **Search API Tab**: Enter a book title or author, click search, and select from results
   - **Manual Entry Tab**: Fill in the book details manually
4. Click "Add Book" to add it to your library
5. Use the "Mark as Read/Unread" button to toggle reading status
6. Click "Remove" to delete a book from your library

## Implementation Details

- Uses constructor functions and prototype methods for object-oriented design
- Each book has a unique ID generated using `crypto.randomUUID()`
- Book data persists across browser sessions using localStorage
- Dialog element for modern modal functionality
- Tab interface for switching between search and manual entry modes

## Project Purpose

This project demonstrates:

- Object-oriented programming concepts in JavaScript
- DOM manipulation and event handling
- Working with forms and user input
- API integration
- Data persistence with localStorage
- Modern CSS styling techniques

## Live Demo

Open the `index.html` file in your browser to see the application in action.

---

_Part of The Odin Project - JavaScript Course_
