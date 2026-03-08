![license](https://img.shields.io/github/license/prahladyeri/abhyasa.svg)
![last-commit](https://img.shields.io/github/last-commit/prahladyeri/abhyasa.svg)
[![patreon](https://img.shields.io/badge/Patreon-brown.svg?logo=patreon)](https://www.patreon.com/prahladyeri)
[![paypal](https://img.shields.io/badge/PayPal-blue.svg?logo=paypal)](https://paypal.me/prahladyeri)
[![follow](https://img.shields.io/twitter/follow/prahladyeri.svg?style=social)](https://x.com/prahladyeri)

# Abhyasa

**Abhyasa** is a modular quiz and assessment engine built as a minimal Single Page Application (SPA) using **esbuild**, **Bootstrap 5**, and an **event-driven architecture**. It is powered by the [Open Quiz Commons](https://github.com/prahladyeri/open-quiz-commons) dataset (CC-BY-SA-4.0), providing ready-to-use quiz questions.


The project is designed for developers, educators, or anyone who wants a **clean, extensible foundation** for quizzes, MCQs, or learning tools.

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
npm run dev
```

Then open `http://localhost:3000` to see the app.

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

However, if you need custom features, professional deployment on Cloudflare, or a bespoke version for your business, you can hire me on [Fiverr](https://www.fiverr.com/prahladyeri).