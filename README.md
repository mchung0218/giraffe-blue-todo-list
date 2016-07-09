# giraffe-blue-todo-list
To do list project for weeklydev @ r/webdev.

## Notes
* Most code goes in: giraffe-blue-todo-list/todolist/
* Front-end is ran by AngularJS, bundled with Browserify.
* Back-end is ran by Django, with PostgreSQL as the database.

## Installation
* Requires Python 3 and PostgreSQL installed.
* If you want to use virtualenv go ahead just name it venv or env.

#### Windows
```
pip install -r requirements.txt
```

To install the psycopg2 requirement, get the [Windows executable](http://www.stickpeople.com/projects/python/win-psycopg/) for the Python version you are using. 

#### Linux/OSX
```
pip3 install -r requirements.txt
sudo apt-get install python-dev libpq-dev postgresql postgresql-contrib
```

#### Setting up the PostgreSQL DB
1. Install PostgreSQL on your system.
2. Create a database and a user using the following statements:
    ```
    CREATE DATABASE bluegiraffe;
    CREATE USER bluegiraffe WITH PASSWORD 'blue';
    GRANT ALL PRIVILEGES ON DATABASE bluegiraffe TO bluegiraffe;
    ```

3. Create and apply migrations for Django.
    ```
    python3 manage.py makemigrations
    python3 manage.py migrate
    ```

## Running the server
#### Windows
```
python manage.py runserver
```

#### Linux/OSX
```
python3 manage.py runserver
```
