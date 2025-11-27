# ✅ Django TODO Application

This project is a simple **TODO web application built using Django** as part of the *AI-Assisted Development* homework.

The goal of the project is to demonstrate how AI can assist in:
- Setting up a Django project
- Designing models
- Implementing application logic
- Creating templates
- Writing and running tests

---

## 🚀 Features

- ✅ Create TODOs  
- ✅ Edit TODOs  
- ✅ Delete TODOs  
- ✅ Assign due dates  
- ✅ Mark TODOs as resolved / unresolved  
- ✅ Fully tested with Django Test Framework  

---

## 🛠️ Tech Stack

- **Python**
- **Django**
- **SQLite (default Django database)**

---

## 📁 Project Structure
01-todo/
└── todo_project/
├── manage.py
├── db.sqlite3
├── templates/
│ ├── base.html
│ └── home.html
├── todo_project/
│ ├── settings.py
│ ├── urls.py
│ ├── wsgi.py
│ └── asgi.py
└── todos/
├── models.py
├── views.py
├── urls.py
├── tests.py
├── admin.py
├── forms.py
└── migrations/


---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
pip install django

2️⃣ Run Migrations
python manage.py makemigrations
python manage.py migrate

3️⃣ Run Tests
python manage.py test


✅ All tests should pass successfully.

4️⃣ Run the Development Server
python manage.py runserver


Open in browser:

http://127.0.0.1:8000/


