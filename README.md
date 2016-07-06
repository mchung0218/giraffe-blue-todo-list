# giraffe-blue-todo-list
To do list project for weeklydev @ r/webdev

## Notes
* Most code goes in: giraffe-blue-todo-list/todolist/

## Installation
* Requires Python 3
* If you want to use virtualenv go ahead just name it venv or env

#### Windows:
pip install -r requirements.txt

#### Linux/OSX
pip3 install -r requirements.txt
sudo apt-get install python-dev libpq-dev postgresql postgresql-contrib

##### PostgreSQL DB
CREATE DATABASE bluegiraffe;
CREATE USER bluegiraffe WITH PASSWORD 'blue';
GRANT ALL PRIVILEGES ON DATABASE bluegiraffe TO bluegiraffe;
python3 manage.py makemigrations
python3 manage.py migrate

## Run
#### Windows:
python manage.py runserver

#### Linux/OSX
python3 manage.py runserver
