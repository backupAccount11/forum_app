from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from .config import DevelopmentConfig


def execute_insert_query(session, model, **kwargs):
    try:
        new_entry = model(**kwargs)
        session.add(new_entry)
        session.commit()
        return True
    except Exception as e:
        app.logger.info("Problem executing INSERT query: " + str(e))
        session.rollback()
        return False
    

def status_update_query(session, model, email):
    try:
        entry = model.query.filter_by(email=email).first()
        entry.active = True
        session.commit()
        return True
    except Exception as e:
        app.logger.info("Problem executing UPDATE query: " + str(e))
        session.rollback()
        return False


app = Flask(__name__)
CORS(app)

app.config.from_object(DevelopmentConfig)
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)

with app.app_context():
    db.create_all()
    print('Database created!')

from .views import *
