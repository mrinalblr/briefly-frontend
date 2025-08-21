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

## Sample Screenshots 
<img width="1512" height="982" alt="Briefly-1" src="https://github.com/user-attachments/assets/753e8211-5d23-4009-a7ea-44593c3a2d6d" />
<img width="1512" height="982" alt="Briefly-2" src="https://github.com/user-attachments/assets/99cc0d01-cfc4-428d-96e1-ee7401f37f20" />
<img width="1512" height="982" alt="Briefly-3" src="https://github.com/user-attachments/assets/086fe0c9-1aa0-4bbd-b9e0-3e2c300a1c09" />
<img width="1512" height="982" alt="Briefly-4" src="https://github.com/user-attachments/assets/4fa1b97f-c084-4813-8aad-9588426c28d1" />
<img width="1512" height="982" alt="Briefly-5" src="https://github.com/user-attachments/assets/75059663-5835-454f-a7aa-c9eea0672755" />
<img width="1512" height="982" alt="Briefly-RAG" src="https://github.com/user-attachments/assets/c0537abf-8f7d-4c6f-bb85-7c99520f6192" />






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
