# MuhammadHamzaKashif.github.io

My personal portfolio site. A single-page static site covering my background, skills, experience, projects, and contact details.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deployed-222222?style=flat-square&logo=githubpages&logoColor=white)

## Sections

- Hero with a short positioning statement
- About, Skills, and Experience
- Work (projects) and a dedicated Mobile section
- Recognition and Contact

## Stack

- Hand-written HTML, CSS, and JavaScript, no build step or framework
- Space Grotesk and JetBrains Mono via Google Fonts
- Scroll reveal animations with an IntersectionObserver, plus a `no-js` fallback class
- Inline SVG favicon and icons

## Layout

```
index.html    markup for the whole page
styles.css    all styling and responsive rules
script.js     nav toggle and scroll reveal behavior
```

## Running locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploying

The repository is served through GitHub Pages. Push to `main` and the site updates at `https://muhammadhamzakashif.github.io/`.

## Accessibility

Skip link, landmark elements (`nav`, `main`), `aria` attributes on the nav toggle, and reduced reliance on color alone for state.
