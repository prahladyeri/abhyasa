![license](https://img.shields.io/github/license/prahladyeri/abhyasa.svg)
![last-commit](https://img.shields.io/github/last-commit/prahladyeri/abhyasa.svg)
[![patreon](https://img.shields.io/badge/Patreon-brown.svg?logo=patreon)](https://www.patreon.com/prahladyeri)
[![paypal](https://img.shields.io/badge/PayPal-blue.svg?logo=paypal)](https://paypal.me/prahladyeri)
[![follow](https://img.shields.io/twitter/follow/prahladyeri.svg?style=social)](https://x.com/prahladyeri)

# Abhyasa

**Abhyasa** is an open-source, modular quiz and assessment engine built as a minimal Single Page Application (SPA) using **esbuild**, **Bootstrap 5**, and an **event-driven architecture**. It is powered by the [Open Quiz Commons](https://github.com/prahladyeri/open-quiz-commons) dataset (CC-BY-SA-4.0), providing ready-to-use quiz questions.


The project is designed for developers, educators, or anyone who wants a **clean, extensible foundation** for quizzes, MCQs, or learning tools.

[Live Demo](https://abhyasa.pages.dev/)

---

## Features

- Modular, SPA-friendly architecture
- Event bus for decoupled state management
- MCQs and timed quizzes
- Easy to extend with new question types
- Minimal dependencies: Bootstrap 5, jQuery optional
- Fully open-source and MIT licensed

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (ES6 modules)
- **Styling:** Bootstrap 5
- **Bundling:** esbuild
- **State Management:** Event Bus pattern
- **Hosting:** Cloudflare Pages

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/prahladyeri/abhyasa.git
cd abhyasa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

This will generate the `dist/` folder (build output).

### 4. Run a local server (optional)

You can use any static server, e.g.:

```bash
npx serve dist
```

Then open [http://localhost:5000](http://localhost:5000) to see the app.

---

## Contributing

Contributions are welcome! If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

**Design Philosophy:**

* Minimal dependencies
* Event-driven flow
* Modular components for easy customization

---

## Data Source

Abhyasa is powered by [Open Quiz Commons](https://github.com/prahladyeri/open-quiz-commons), an open-source dataset of quiz questions released under [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/).

All questions included in this app are attributed to their original authors as per the license.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## About the Author

**Prahlad Yeri** – Full-stack developer & freelancer.
Abhyasa is part of my open-source portfolio showcasing **clean architecture and modular SPA design**.

[GitHub](https://github.com/prahladyeri) | [Portfolio](https://prahladyeri.github.io)