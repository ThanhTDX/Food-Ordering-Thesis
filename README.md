# Food-Ordering-Thesis

Made with Django. Link to project: <https://github.com/ThanhTDX/Food-Ordering-Thesis/>

Frontend: Bootstrap 5

Frontend template is from [HTML Codex](https://htmlcodex.com/bootstrap-restaurant-template/)

## Version

- Python: 3.12.2. Download Python [here](https://www.python.org/downloads/release/python-3122/)
- Django: 4.2.11. Download Django [here](https://www.djangoproject.com/download/)

## Other Django addons used in the project

- djlint:
- cripsy
- django REST framework
- django-widget-tweaks

## Create virtual environment

Go to food-ordering

```terminal
cd food-ordering
```

and execute this command

```terminal
activate
```

Your terminal should look like this

```terminal
(food-ordering) <Your Directory>\Food-Ordering-Thesis\food-ordering>
```

## Setup Database

## Get necessary from requirements.txt

Move to "app" directory

```terminal
cd food-ordering/app
```

and execute this command

```terminal
pip freeze > requirements.txt (python2)
pip3 freeze > requirements.txt (python3)
```

## Run the program

Move to "app" directory

```terminal
cd  food-ordering/app
```

and execute this command

```terminal
python manage.py runserver
```

If successful, the project can be seen on the browser on address [127.0.0.1:8000](http://127.0.0.1:8000/)

## Project modification

All project structure and APIs is included in this Google Docs
 (not finished yet)
Before you want to make modifications to the project, I suggest reading [the Django 5.0 documentation](https://docs.djangoproject.com/en/5.0/) on the website
