# 🤖 Python NLP Chatbot

A rule-based chatbot built using Python, Flask, and Natural Language Processing (NLP) concepts. It provides an interactive web interface where users can send messages and receive automated responses.

## 🌐 Live Demo

**Try the chatbot here:** [CleverBot ](https://chatbot-prj-k512.onrender.com/)[— Live Website](https://chatbot-prj-k512.onrender.com/) : [chatbot-prj-k512.onrender.com](https://chatbot-prj-k512.onrender.com/)

The application is deployed using Render. Open the link above to interact with the chatbot online.

## 🚀 Features

- Interactive chatbot web interface
- Rule-based responses using Python regular expressions
- Randomized responses for supported patterns
- Greeting and general conversation handling
- Flask backend with a REST-style chat endpoint
- Responsive frontend using HTML, CSS, and JavaScript
- Easy to run locally and deploy online

## 🛠️ Technologies Used

- **Python** — chatbot logic
- **Flask** — web application backend
- **NLTK** — Natural Language Toolkit, included as a project dependency
- **HTML5** — page structure
- **CSS3** — styling and responsive layout
- **JavaScript** — frontend interactions
- **Git and GitHub** — version control and source code hosting

## 📁 Project Structure

```text
chatbot-prj/
├── app.py
├── chatbot.py
├── requirements.txt
├── .gitignore
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/sonupal0029/chatbot-prj.git
```

### 2. Navigate to the project folder

```bash
cd chatbot-prj
```

### 3. Create a virtual environment (recommended)

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 5. Run the application

```bash
python app.py
```

### 6. Open the chatbot

Visit the following URL in your browser:

```text
http://127.0.0.1:5000
```

## 💬 How It Works

1. The user enters a message in the chatbot interface.
2. JavaScript sends the message to the Flask backend.
3. Flask passes the message to the chatbot response function.
4. The Python chatbot matches the message against predefined patterns.
5. A suitable response is returned to the frontend and displayed to the user.

## 🎯 Learning Objectives

This project demonstrates practical experience with:

- Python programming
- Basic rule-based NLP techniques
- Regular expressions and text matching
- Flask routes and JSON responses
- Frontend and backend integration
- Git and GitHub workflows

## 🔮 Future Improvements

- Add more conversation patterns and FAQs
- Integrate an NLP intent-classification model
- Store conversations using SQLite
- Add user session management
- Improve error handling and input validation
- Deploy the chatbot using a cloud hosting platform

## 👨‍💻 Author

**Sonu Pal**

GitHub: [@sonupal0029](https://github.com/sonupal0029)

## 📄 License

This project is available for learning and educational purposes. Add a license file if you want to specify formal permissions for reuse and distribution.
