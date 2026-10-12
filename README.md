# QuickNotes

QuickNotes is a simple note-taking web app built with HTML, CSS and JavaScript. You can write short notes, give each one a category (Personal, Work or Study), search through them, and delete them. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add notes with a category: Personal, Work or Study
- Each note shows its text, category, and the date and time it was created
- Validation: empty notes and notes longer than 200 characters show an error message
- Delete any single note
- Live search that ignores upper and lower case
- A note count that says "no notes", "1 note" or "N notes"
- Notes are saved with localStorage and survive a page refresh
- Responsive layout that stacks the form on small screens
- Clear all button with a confirmation pop-up

## How to run it locally

1. Clone the repository: `git clone https://github.com/Angela-Paul/quicknotes-app.git`
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server** (or click **Go Live**). You can also just double-click `index.html` to open it in your browser.

## What I learned

- How to select and change elements with the DOM, and how the render pattern keeps the screen in sync with an array of data.
- How to use localStorage with `JSON.stringify` and `JSON.parse` to keep data after a refresh.
- Why user text should be added with `textContent` and not `innerHTML`, to avoid XSS attacks.
- How to use Flexbox and a media query to build a layout that works on phones.
- How to use Git and GitHub from the terminal, and to make small commits as I finish each task.