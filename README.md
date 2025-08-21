# Briefly Frontend

This is a React-based frontend application to input text and display summarized responses from the Briefly backend API. It features a modern UI with Tailwind CSS styling and Markdown rendering.

---

## Features

- User input textarea with material-inspired gradient styling
- Submit button with loading spinner and gradient animation
- Displays summarized output formatted as Markdown
- Responsive and accessible UI
- Client-side input validation and error display

---

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js) or Yarn
- Backend API running and accessible at `http://localhost:8081`

---

## Getting Started

### Clone the repo
```
git clone <repo-url>
cd briefly

```

### Install dependencies

```
npm install
```
### Configure Backend API URL

Update fetch calls or create an `.env` file in the project root with:
REACT_APP_BACKEND_URL=http://localhost:8081

Then use this env var in your API calls:

```
const response = await fetch(${process.env.REACT_APP_BACKEND_URL}/api/summarize?agent=gemini, {...});
```

### Run in Development Mode
```
npm start
```


Open `http://localhost:3000` in your browser.

---

## Project Structure

- `src/App.jsx`: Main app component handling user input, fetch, and response display.
- `src/components/SummarizerResponseDisplay.jsx`: Renders Markdown with sanitized content.
- `src/index.css`: Imports Tailwind CSS directives.
- `tailwind.config.js`: Tailwind configuration specifying source files for purging.
- `.env`: Environment variables for backend URL.

---

## Styling and UI

- Uses Tailwind CSS and `@tailwindcss/typography` plugin for Markdown styling.
- Gradient backgrounds and shadows for inputs and buttons.
- Responsive design with maximum container widths.
- Loading spinner SVG in button for feedback.
- Floating label style textarea with focus rings for accessibility.


---

## Troubleshooting

- Ensure backend API is running and reachable.
- Check browser console for network or CORS errors.
- Validate environment variables if API URLs are not loading.
- Tailwind styles may require rebuild if classes do not apply.

---

## Technologies Used

- React 18+
- Tailwind CSS 3.x
- React Markdown for rendering summaries
- Vite or Create-React-App (depending on setup)
- JavaScript (ES6+)

---

## License

This project is licensed under the MIT License.
