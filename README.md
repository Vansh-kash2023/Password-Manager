# Password Manager

This repository contains two versions of a **Password Manager**. Both versions provide secure storage of passwords, but they use different storage mechanisms: one uses `localStorage` in the browser, and the other uses a **MongoDB** database.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Tech Stack

### Version 1: Password Manager - LocalStorage
- **ReactJS**
- **ViteJS**
- **TailwindCSS**

### Version 2: Password Manager - MongoDB
- **ReactJS**
- **ViteJS**
- **TailwindCSS**
- **MongoDB**
- **ExpressJS**
- **POSTMAN API**

---

## Features

### Version 1: Password Manager - LocalStorage
- Store and retrieve passwords using the browser's `localStorage`.
- User-friendly interface with modern design using **TailwindCSS**.
- Fast performance thanks to **ViteJS** bundling.
- Password data remains on the client side.

### Version 2: Password Manager - MongoDB
- Store and manage passwords in a **MongoDB** database for enhanced security.
- RESTful API built using **ExpressJS**.
- End-to-end testing with **POSTMAN**.
- Responsive and clean UI built with **TailwindCSS**.
- Backend powered by **Node.js** to manage password data.

---

## Setup

### Clone the repository:
```bash
git clone https://github.com/yourusername/Password-Manager.git
```
### Navigate to the version folder you want to run:

#### For **LocalStorage** version:
```bash
cd Password-Manager-localstorage
```
#### For **MongoDB** version:
```bash
cd Password-Manager-mongo
```

### Install the required dependencies
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```

## Usage

### Version 1: LocalStorage
- Simply add passwords using the provided form.
- Passwords are stored in localStorage, accessible only on the device where they're saved.

### Version 2: MongoDB
- Input your passwords, which are securely stored in the MongoDB database via the backend API.
- Use POSTMAN to interact with the API for testing purposes, if desired.

## Contributing
Contributions are welcome! If you would like to improve the project or report an issue, feel free to submit a pull request or open an issue.
