# CV Application (React)

This project is a CV builder created with React and Vite for The Odin Project.

## Features

- General information section (name, email, phone number)
- Educational experience section (school name, title of study, date of study)
- Practical experience section (company, position, responsibilities, date from, date until)
- Projects section (project name, role, description, technologies, date)
- Volunteer experience section (organization, role, responsibilities, date from, date until)
- Live CV preview panel to see how the CV will look while editing
- Edit/submit workflow for each section
  - **Submit** displays the entered data as regular HTML content
  - **Edit** reopens the form with previously submitted values, allowing updates and resubmission

## Project Structure

```
CV-Application/
├── src/
│   ├── components/
│   │   ├── CVPreview.jsx
│   │   ├── EducationSection.jsx
│   │   ├── GeneralInfoSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── PracticalExperienceSection.jsx
│   │   └── VolunteerSection.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── index.css
│   │   └── Section.css
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Notes

- You may notice some logs or renders happen twice in development. This is expected when using `React.StrictMode`.

## Deployment Options

Deploy with any platform you prefer. Common options:

- Netlify
- Vercel
- GitHub Pages
