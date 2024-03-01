from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS

from config import DevelopmentConfig



# def populate_categories_from_file(session, model, filename):
#     with open(filename, 'r') as file:
#         lines = file.readlines()
#         for line in lines:
#             parts = line.strip().split(', ')
#             if len(parts) == 2:
#                 name, color = parts
#                 category = model(name=name, color=color)
#                 session.add(category)
#         session.commit()


def execute_insert_query(session, model, **kwargs):
    try:
        new_entry = model(**kwargs)
        session.add(new_entry)
        session.commit()
        return { 'success': True, 'data': new_entry }
    except Exception as e:
        app.logger.info("Problem executing INSERT query: " + str(e))
        session.rollback()
        return False

def execute_insert_query_obj(session, obj):
    try:
        session.add(obj)
        session.commit()
        return { 'success': True, 'data': obj }
    except Exception as e:
        app.logger.info("Problem executing INSERT query: " + str(e))
        session.rollback()
        return False
    

def status_update_query(session, model, email, **kwargs):
    try:
        entry = model.query.filter_by(email=email).first()
        entry.active = True if kwargs['type'] == 'login' else False
        session.commit()
        return True
    except Exception as e:
        app.logger.info("Problem executing UPDATE query: " + str(e))
        session.rollback()
        return False


app = Flask(__name__)
login_manager = LoginManager(app)

CORS(app, supports_credentials=True)

login_manager.login_view = "login"

app.config.from_object(DevelopmentConfig)
app.config['CORS_HEADERS'] = 'Content-Type'

if not app.config['DEBUG']:
    app.config['SESSION_COOKIE_SECURE'] = True

Session(app)

db = SQLAlchemy(app)

from users import models, views
from forum import models, views

with app.app_context():
    db.create_all()
    print('Tables created!')

# populate_categories_from_file(db.session, models.Category, 'categories.txt')
